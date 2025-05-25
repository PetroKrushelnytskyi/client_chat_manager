// import { initTRPC } from '@trpc/server';
// import { createContext } from '../context';

// const t = initTRPC.context<typeof createContext>().create();

// export const appRouter = t.router({
//   hello: t.procedure
//     .input((val: unknown) => {
//       if (typeof val === 'string') return val;
//       throw new Error('Invalid input');
//     })
//     .query(({ input }) => {
//       return { message: `Hello from server! You sent: ${input}` };
//     }),
// });

// export type AppRouter = typeof appRouter;