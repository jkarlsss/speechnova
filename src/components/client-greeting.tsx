"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "../trpc/client";

export function ClientGreeting() {
  const trpc = useTRPC();
  const greeting = useSuspenseQuery(trpc.hello.queryOptions());

  return <div>{greeting.data.greeting}</div>;
}
