import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '@client/config';
import { trpc } from '../../../lib/trpc';

export const useMessages = (userId?: number) => {
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

  const currentUserId = useRef<number | undefined>(userId);
  useEffect(() => {
    currentUserId.current = userId;
  }, [userId]);

  useEffect(() => {
    const socket = io(API_URL, { reconnectionAttempts: 3 });

    socket.on('newMessage', (newMessage) => {
      if (currentUserId.current && newMessage.userId === currentUserId.current) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return messages;
};
