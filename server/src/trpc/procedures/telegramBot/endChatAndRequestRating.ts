import { z } from 'zod';
import { publicProcedure } from '../../../trpc';
import { PrismaClient } from '@prisma/client';
import { sendRatingRequest } from '../../../utils/telegramBot/sendRatingRequest';

const prisma = new PrismaClient();

export default publicProcedure
  .input(z.object({
    userId: z.number(),
    accountId: z.number(),
  }))
  .mutation(async ({ input }) => {
    const { userId, accountId } = input;
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    
    const chat = await prisma.chat.findFirst({ where: { chatId: user.telegramId } });
    if (!chat) throw new Error('Chat not found for this user');

    await sendRatingRequest(Number(chat.chatId), userId, accountId, chat.id);
    
    return { success: true };
  });