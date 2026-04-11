import { Suspense } from "react";
import { HydrateClient, prefetch, trpc } from "../../trpc/server"
import { ClientGreeting } from "../../components/client-greeting";
import { ErrorBoundary } from 'react-error-boundary';

const Page = () => {

  prefetch(trpc.hello.queryOptions());

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientGreeting />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default Page