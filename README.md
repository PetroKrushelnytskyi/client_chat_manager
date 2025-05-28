client_chat_manager: is a system for small and medium-sized businesses that allows managers to respond to user messages from Telegram through a convenient web interface in real time. 
<img width="1678" alt="Знімок екрана 2025-05-28 о 14 42 30" src="https://github.com/user-attachments/assets/e5d057fc-7f9f-4951-a093-5a841f5aa278" />

⚙️ Functionality:
🔐 Authorization using JWT

💬 Messages sent by users to the Telegram bot automatically appear on the website via WebSocket

🖥️ The manager sends replies directly from the web interface, and the bot delivers them back to the user

🔄 Real-time chat

👥 Multi-user support

🧰 Technology Stack:
Frontend:
React + TypeScript

Tailwind CSS

WebSocket (for real-time messaging)

TRPC (for type-safe server communication)

Backend:
Express.js + TypeScript

TRPC

Prisma ORM

MySQL

Telegram Bot API 

Installation and Setup:
git clone 
/client: .env: VITE_API_URL 
cd client
npm install
npm run dev
/server: .env:DATABASE_URL=mysql://user:password@localhost:3306/dbname, BOT_TOKEN=your_telegram_bot_token
cd server
npm install
npm run dev


Contacts: Telegram: +380977249896, email:petrowebdevelop@gmail.com

This project is created for demonstration purposes and does not have an open license.


