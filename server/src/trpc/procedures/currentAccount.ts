import { publicProcedure } from '../../trpc';
import { Account } from '@prisma/client';

export default publicProcedure.query(
  async ({
    ctx: { account }
  }): Promise<{
    account: Account;
  } | null> => {
    if (!account) return null;

    return { account };
  }
);
