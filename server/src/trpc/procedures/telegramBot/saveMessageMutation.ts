import { PrismaClient } from '@prisma/client';
import { io } from '../../../socket'; //

const prisma = new PrismaClient();

export const saveMessage = async ({
  telegramId,
  chatId,
  message,
  type = 'TELEGRAM',
}: {
  telegramId: number;
  chatId: number;
  message: string;
  type?: string;
}) => {
  try {
    const user = await prisma.user.findUnique({ where: { telegramId: BigInt(telegramId) } });
    const chat = await prisma.chat.findFirst({ where: { chatId: BigInt(chatId) } });

    if (!chat) {
      throw new Error('Chat not found');
    }

    const newMessage = await prisma.messages.create({
      data: {
        message,
        type,
        userId: user?.id,
        chatId: chat.id,
        createdAt: new Date(),
      },
    });

    // Emit WebSocket event to notify clients about the new message
    io.emit('newMessage', {
      id: newMessage.id,
      message: newMessage.message,
      chatId: newMessage.chatId,
      userId: newMessage.userId,
      createdAt: newMessage.createdAt,
    });

    return { success: true, message: 'Message saved' };
  } catch (error) {
    console.error('❌ Error saving message:', error);
    throw new Error('Failed to save message');
  }
};