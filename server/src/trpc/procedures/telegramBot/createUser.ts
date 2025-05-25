import { publicProcedure } from '../../../trpc';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { initBot } from '../../../telegramBot/botFunctions';
import { saveMessage } from './saveMessageMutation';

const prisma = new PrismaClient();

export const createUserSchema = z.object({
  telegramId: z.number(),
  firstName: z.string(),
  lastName: z.string().optional(),
  chatId: z.number(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

const createOrUpdateUser = async ({ telegramId, firstName, lastName, chatId }: CreateUserInput) => {
  try {
    const [user, chat] = await Promise.all([
      prisma.user.findUnique({ where: { telegramId: BigInt(telegramId) } }),
      prisma.chat.findFirst({ where: { chatId: BigInt(chatId) } }),
    ]);

    if (!user) {
      await prisma.user.create({
        data: {
          telegramId: BigInt(telegramId),
          name: `${firstName} ${lastName || ''}`.trim(),
        },
      });
    }

    if (!chat) {
      await prisma.chat.create({ data: { chatId: BigInt(chatId) } });
    }

    return { success: true, message: 'User/chat created or already existed' };
  } catch (error) {
    throw new Error('Failed to create user or chat');
  }
};

export const createUser = publicProcedure
  .input(createUserSchema)
  .mutation(async ({ input }) => createOrUpdateUser(input));

initBot({ createOrUpdateUser, saveMessage });

export default createUser;