import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';

import { appRouter } from './router';
import { createContext } from './trpc';
import { APP_VERSION, HOST, PORT } from './config';
import { initSocket } from './socket';

async function main() {
  const app = express();
  const httpServer = createServer(app);

  // Ініціалізація Socket.io
  initSocket(httpServer);

  app.use(cors());
  app.use(express.json());

  app.use((req, _res, next) => {
    next();
  });

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.get('/', (_req, res) => {
    res.send(APP_VERSION);
  });

  httpServer.listen(Number(PORT), HOST || undefined, () => {
    console.log(`🚀 Server ready at ${HOST ?? 'localhost'}:${PORT}`);
  });
}

void main();
