import { z } from 'zod';
import { publicProcedure } from '../../../trpc';
import { PrismaClient } from '@prisma/client';
import { io } from '../../../socket';
import { sendTelegramMessage } from '../../../utils/telegramBot/sendTelegramMessage';

const prisma = new PrismaClient();

const sendingMessegInputSchema = z.object({
  accountId: z.number(),
  userId: z.number(),
  messeg: z.string(),
  type: z.string().default('MENEGER'),
});

const sendingMesseg = publicProcedure
  .input(sendingMessegInputSchema)
  .mutation(async ({ input }) => {
    const { userId, messeg, type, accountId } = input;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const chat = await prisma.chat.findFirst({ where: { chatId: user.telegramId } });
    if (!chat) throw new Error('Chat not found for this user');

    await sendTelegramMessage({ chatId: Number(chat.chatId), text: messeg });

    const newMessage = await prisma.messages.create({
      data: {
        message: messeg,
        type,
        accountId,
        chatId: chat.id,
      },
    });

    io.emit('newMessage', {
      ...newMessage,
      userId,
    });

    return newMessage;
  });

export default sendingMesseg;
