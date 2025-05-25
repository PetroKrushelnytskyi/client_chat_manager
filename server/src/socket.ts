import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';

export let io: Server;

export const initSocket = (httpServer: HTTPServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('message', (data) => {
      socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
    });
  });
};
