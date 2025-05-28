import { publicProcedure } from '../../../trpc';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = publicProcedure.query(async () => {
    const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          messages: {
            where: {
              read: false,
            },
          },
        },
      },
    },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    unread: user._count.messages > 0
  }));
});