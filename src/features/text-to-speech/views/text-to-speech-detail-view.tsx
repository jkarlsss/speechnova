"use client";

import { useSuspenseQueries } from "@tanstack/react-query";
import { useTRPC } from "../../../trpc/client";
import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import {
  TextToSpeechForm,
  TTSFormValues,
} from "../components/text-to-speech-form";
import { VoicePreviewMobile } from "../components/voice-preview-mobile";
import { VoicePreviewPanel } from "../components/voice-preview-panel";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";

export default function TextToSpeechDetailView({
  generationId,
}: {
  generationId: string;
}) {
  const trpc = useTRPC();

  const [generationQuery, voicesQuery] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions(),
    ],
  });

  const data = generationQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;

  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  // Requested voice may no longer exist, so we need to check if it's still available and fallback to a default one if not
  const resolvedVoiceId =
    data?.voiceId && allVoices.some((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: data?.text,
    voiceId: resolvedVoiceId,
    temperature: data?.temperature,
    topP: data?.topP,
    topK: data?.topK,
    repetitionPenalty: data?.repetitionPenalty,
  };

  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewMobile
              audioUrl={data?.audioUrl}
              voice={generationVoice}
              text={data?.text}
            />
            <VoicePreviewPanel
              audioUrl={data?.audioUrl}
              voice={generationVoice}
              text={data?.text}
            />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}
