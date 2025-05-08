import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/app';
import { createContext } from './context';
import cors from 'cors'; // Додайте цей імпорт

const app = express();
const PORT = 3001;
// Додайте CORS-політику
app.use(cors());
app.use(express.json());
// Дозволяє парсити JSON-тіла запитів
app.use(express.json());

// tRPC-роут
app.use('/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

// Простий GET-роут для перевірки (опціонально)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});