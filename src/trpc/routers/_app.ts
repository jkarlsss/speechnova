import { baseProcedure, createTRPCRouter } from '../init';
 
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .query(() => {
      return {
        greeting: `hello`,
      };
    }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;