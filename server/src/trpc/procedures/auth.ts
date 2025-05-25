import { publicProcedure } from '../../trpc';
import { createJwtToken } from '../../utils/jwt';
import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
const prisma = new PrismaClient();

const t = initTRPC.context().create();

export const singIn = t.router({
  login: publicProcedure
    .input(
      z.object({
        login: z.string(),
        password: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const account = await prisma.account.findFirst({
        where: {
          login: input.login,
          password: input.password
        }
      });

      if (!account) {
        throw new Error('Invalid login or password');
      }

      const token = createJwtToken({
        accountId: account.id
      });

      return { success: true, token };
    })
});
