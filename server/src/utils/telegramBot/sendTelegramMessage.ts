import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN!);
export const sendTelegramMessage = async ({
  chatId,
  text,
}: {
  chatId: number | bigint;
  text: string;
}) => {
  try {
    await bot.telegram.sendMessage(Number(chatId), text);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send message to Telegram:', error);
    return { success: false, error };
  }
};

