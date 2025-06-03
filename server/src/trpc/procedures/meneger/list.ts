import { AccountRoleEnum } from '../../../enums';
import { publicProcedure } from '../../../trpc';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllMeneger = publicProcedure.query(async () => {
    const menegers = await prisma.account.findMany({
      where: {
        role: AccountRoleEnum.MANAGER,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
  
    return menegers;
  });
  
