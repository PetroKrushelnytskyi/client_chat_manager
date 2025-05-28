import { z } from 'zod';
import { publicProcedure } from '../../../trpc';
import { PrismaClient } from '@prisma/client';
import { io } from '../../../socket';

const prisma = new PrismaClient();

export default publicProcedure
  .input(z.object({ userId: z.number() }))
  .mutation(async ({ input }) => {
    const { userId } = input;

   const result = await prisma.messages.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });

    io.emit('messagesRead', { ...result, userId });

    return result;
  });
