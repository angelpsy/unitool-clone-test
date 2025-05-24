import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const port = process.env.NEXT_PUBLIC_WS_PORT ? parseInt(process.env.NEXT_PUBLIC_WS_PORT) : 3000;

const io = new Server(port, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  socket.on('chat_message', (msg) => {
    socket.emit('system_message', { type: 'ai_typing_started' });

    setTimeout(() => {
      socket.emit('chat_message', msg);
      socket.emit('system_message', { type: 'ai_typing_finished' });
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  socket.emit('welcome', 'Welcome to the Socket.IO chat server!');
});

console.log('Socket.IO server running on port', port);