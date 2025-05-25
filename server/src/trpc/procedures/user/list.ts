// apps/api/src/server/trpc/procedures/users/getAllUsers.ts
import { publicProcedure } from '../../../trpc';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUsers = publicProcedure.query(async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
    },
  });
});