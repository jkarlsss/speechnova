import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { VOICE_CATEGORIES } from "../../../../features/voices/data/voice-categories";
import { VoiceCategory } from "../../../../generated/prisma/enums";
import { parseBuffer } from "music-metadata";
import { uploadAudio } from "../../../../lib/r2";
import { prisma } from "../../../../lib/db";
import { polar } from "../../../../lib/polar";

const createVoiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(VOICE_CATEGORIES as [VoiceCategory, ...VoiceCategory[]]),
  language: z.string().min(1, "Language is required"),
  description: z.string().nullish(),
});

const MAX_UPLOAD_SIZE_BYTES = 20 * 1024 * 1024; // 20MB
const MIN_AUDIO_DURATION_SECONDS = 10;

export async function POST(request: Request) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check for active subscriptions before creating a voice
  try {
    const customerState = await polar.customers.getStateExternal({
      externalId: orgId,
    });

    const hasActiveSubscription =
      (customerState.activeSubscriptions ?? []).length > 0;

    if (!hasActiveSubscription) {
      throw Response.json({
        error: "SUBSCRIPTION_REQUIRED",
      }, { status: 403 });
    }
  } catch {
    return Response.json({ error: "SUBSCRIPTION_REQUIRED" }, { status: 403 });
  }

  const url = new URL(request.url);

  const validation = createVoiceSchema.safeParse({
    name: url.searchParams.get("name"),
    category: url.searchParams.get("category"),
    language: url.searchParams.get("language"),
    description: url.searchParams.get("description"),
  });

  if (!validation.success) {
    return Response.json({ error: validation.error.message }, { status: 400 });
  }
  // const formData = await request.formData();
  const { name, category, language, description } = validation.data;

  const fileBuffer = await request.arrayBuffer();

  if (!fileBuffer.byteLength) {
    return Response.json({ error: "Audio file is required" }, { status: 400 });
  }

  if (fileBuffer.byteLength > MAX_UPLOAD_SIZE_BYTES) {
    return Response.json({ error: "Audio file is too large" }, { status: 400 });
  }

  const contentType = request.headers.get("content-type");

  const normalizedContentType = contentType?.split(";")[0]?.trim() || "audio/wav";

  let duration: number;

  try {
    const metadata = await parseBuffer(
      new Uint8Array(fileBuffer),
      { mimeType: normalizedContentType },
      { duration: true },
    )

    duration = metadata.format.duration ?? 0;
  } catch {
    return Response.json({ error: "Failed to parse audio file" }, { status: 400 });
  }

  if (duration < MIN_AUDIO_DURATION_SECONDS) {
    return Response.json({ error: "Audio file is too short" }, { status: 400 });
  }

  let createdVoiceId: string | null = null;

  try {
    const voice = await prisma.voice.create({
      data: {
        orgId,
        name,
        category,
        language,
        description,
        variant: "CUSTOM",
      },
      select: { id: true },
    });

    createdVoiceId = voice.id;

    const r2ObjectKey = `voices/orgs/${orgId}/${voice.id}`;

    await uploadAudio({
      key: r2ObjectKey,
      buffer: Buffer.from(fileBuffer),
      contentType: normalizedContentType,
    });

    await prisma.voice.update({
      where: { id: voice.id },
      data: { r2ObjectKey },
    });

  } catch {
    if (createdVoiceId) {
      await prisma.voice.delete({ where: { id: createdVoiceId } }).catch(() => {});
    }

    return Response.json({ error: "Failed to create voice" }, { status: 500 });
  }

  // Ingest usage eventto Polar (fire-and-forget, don't block response)
  polar.events.ingest({
    events: [
      {
        name: "voice_creation",
        externalCustomerId: orgId,
        metadata: {},
        timestamp: new Date(),
      }
    ]
  }).catch(() => {});

  return Response.json({ name, message: "Voice created" },
    { status: 200 },
  );
}
