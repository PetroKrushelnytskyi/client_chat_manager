import { Telegraf } from 'telegraf';
import { CreateUserInput } from '../../trpc/procedures/telegramBot/createUser';

interface BotFunctions {
  createOrUpdateUser?: (input: CreateUserInput) => Promise<{ success: boolean; message: string }>;
  saveMessage?: (input: {
    telegramId: number;
    chatId: number;
    message: string;
    type?: string;
  }) => Promise<{ success: boolean; message: string }>;
}

export function initBot({ createOrUpdateUser, saveMessage }: BotFunctions) {
  const bot = new Telegraf(process.env.BOT_TOKEN!);

  bot.start(async (ctx) => {
    const { id: telegramId, first_name: firstName, last_name: lastName } = ctx.from;
    const chatId = ctx.chat.id;

    try {
      if (createOrUpdateUser) {
        await createOrUpdateUser({ telegramId, firstName, lastName, chatId });
      }
      await ctx.reply('Доброго дня! Чим можу допомогти?');
    } catch (error) {
      console.error('❌ Error in bot start:', error);
      await ctx.reply('Сталася помилка при збереженні ваших даних.');
    }
  });

  bot.on('text', async (ctx) => {
    const { id: telegramId } = ctx.from;
    const chatId = ctx.chat.id;
    const message = ctx.message.text;

    try {
      if (saveMessage) {
        await saveMessage({ telegramId, chatId, message, type: 'TELEGRAM' });
      }
    } catch (error) {
      console.error('❌ Error saving message:', error);
      await ctx.reply('Сталася помилка при збереженні повідомлення.');
    }
  });

  bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}