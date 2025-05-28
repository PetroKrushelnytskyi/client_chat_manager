import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '@client/config';
import { trpc } from '../../../lib/trpc';

export const useMessages = (userId?: number) => {
  const utils = trpc.useContext();
  const currentUserId = useRef<number | undefined>(userId);

  const markMessagesAsRead = trpc.users.markMessagesAsRead.useMutation();

  const { data: initialMessages } = trpc.users.getMessagesByUser.useQuery(
    { userId: userId ?? 0 },
    { enabled: !!userId }
  );

  const [messages, setMessages] = useState(() => initialMessages ?? []);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    currentUserId.current = userId;
  }, [userId]);

  useEffect(() => {
    const socket = io(API_URL, { reconnectionAttempts: 3 });

    socket.on('newUser', () => {
      utils.users.list.invalidate();
    });

    socket.on('newMessage', (newMessage) => {
      if (currentUserId.current && newMessage.userId === currentUserId.current) {
        setMessages((prev) => [...prev, newMessage]);
        markMessagesAsRead.mutate({ userId: newMessage.userId });
      }
      utils.users.list.invalidate();
    });

    socket.on('messagesRead', ({ userId: readUserId }) => {
      if (readUserId === currentUserId.current) {
        utils.users.list.invalidate();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [utils, markMessagesAsRead]);

  return messages;
};
