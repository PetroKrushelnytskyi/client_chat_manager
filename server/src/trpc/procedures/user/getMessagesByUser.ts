import { z } from 'zod';
import { publicProcedure } from '../../../trpc';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMessagesByUser = publicProcedure
  .input(
    z.object({
      userId: z.number(),
    })
  )
  .query(async ({ input }) => {
    const { userId } = input;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');

    const chat = await prisma.chat.findFirst({
      where: { chatId: user.telegramId },
    });
    if (!chat) throw new Error('Chat not found for this user');

    const messagesList = await prisma.messages.findMany({
      where: { chatId: chat.id },
      select: {
        id: true,
        message: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        account: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    

    return messagesList;
  });
