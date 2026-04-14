import { Metadata } from "next";
import { SearchParams } from "nuqs/server";
import { voicesSearchParamsCache } from "../../../features/voices/lib/params";
import { HydrateClient, prefetch, trpc } from "../../../trpc/server";
import { VoicesView } from "../../../features/voices/views/voices-view";

export const metadata: Metadata = {
  title: "Voices",
};

export default async function VoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {

  const { query } = await voicesSearchParamsCache.parse(searchParams);

  prefetch(trpc.voices.getAll.queryOptions({ query }));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
}
