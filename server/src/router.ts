import { router } from './trpc';
import { procedures } from './trpc/procedures';
import createUser  from './trpc/procedures/telegramBot/createUser';
import { singIn } from './trpc/procedures/auth';
import { getAllUsers } from './trpc/procedures/user/list';
import { getMessagesByUser } from './trpc/procedures/user/getMessagesByUser';
import sendingMesseg from './trpc/procedures/user/sendingMesseg';
import markMessagesAsRead from './trpc/procedures/user/markMessagesAsRead';
import { getAllMeneger } from './trpc/procedures/meneger/list';
import endChatAndRequestRating from './trpc/procedures/telegramBot/endChatAndRequestRating';

export const appRouter = router({

    auth: singIn,
    bot: router({
        createUser: createUser,
        endChatAndRequestRating: endChatAndRequestRating
    }),
    users: router({
        list: getAllUsers,
        getMessagesByUser: getMessagesByUser,
        sendingMesseg: sendingMesseg,
        markMessagesAsRead: markMessagesAsRead,

    }),
    meneger: router({
        list: getAllMeneger
    }),
    ...procedures,
});

export type AppRouter = typeof appRouter;