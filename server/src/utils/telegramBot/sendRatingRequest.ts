import { PrismaClient } from '@prisma/client';
import bot from './bot';

const prisma = new PrismaClient();

bot.on('callback_query', async (ctx) => {
  try {
    if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) return;
    
    const callbackData = ctx.callbackQuery.data;
    if (!callbackData.startsWith('rating_')) return;

    const [_, ratingStr, userIdStr, accountIdStr, chatIdStr] = callbackData.split('_');
    const [ratingValue, userId, accountId, chatId] = [ratingStr, userIdStr, accountIdStr, chatIdStr].map(Number);

    const existingRating = await prisma.ratingMeneger.findFirst({ 
      where: { userId, accountId, chatId } 
    });

    if (existingRating) {
      await ctx.editMessageText('Ваша оцінка вже була збережена раніше!', { reply_markup: { inline_keyboard: [] } });
      return ctx.answerCbQuery();
    }

    await prisma.ratingMeneger.create({ 
      data: { userId, accountId, chatId, rating: ratingValue } 
    });

    await ctx.editMessageText(`Дякуємо за вашу оцінку: ${ratingValue}!`, { reply_markup: { inline_keyboard: [] } });
    await ctx.answerCbQuery();
  } catch (error) {
    console.error('Error saving rating:', error);
    await ctx.answerCbQuery('Помилка при збереженні оцінки');
  }
});

export const sendRatingRequest = async (telegramChatId: number, userId: number, accountId: number, chatId: number) => {
  const buttons = [1, 2, 3, 4, 5].map(num => ({
    text: num.toString(),
    callback_data: `rating_${num}_${userId}_${accountId}_${chatId}`
  }));

  await bot.telegram.sendMessage(
    telegramChatId,
    'Будь ласка, оцініть якість обслуговування від 1 до 5:',
    { reply_markup: { inline_keyboard: [buttons] } }
  );
};

export default bot;