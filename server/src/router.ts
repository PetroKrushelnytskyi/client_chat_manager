import { router } from './trpc';
import { procedures } from './trpc/procedures';
import createUser  from './trpc/procedures/telegramBot/createUser';
import { singIn } from './trpc/procedures/auth';
import { getAllUsers } from './trpc/procedures/user/list';
import { getMessagesByUser } from './trpc/procedures/user/getMessagesByUser';

export const appRouter = router({

    auth: singIn,
    bot: router({
        createUser: createUser,
    }),
    users: router({
        list: getAllUsers,
        getMessagesByUser: getMessagesByUser

    }),
    ...procedures,
});

export type AppRouter = typeof appRouter;