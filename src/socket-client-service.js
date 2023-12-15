import io from 'socket.io-client';

export default {
  data() {
    return {
      message: null,
    };
  },
  mounted() {
    // Replace 'http://your-server-address:4004' with the actual address of your server
    const socket = io('http://localhost:4004');

    socket.on('info', (data) => {
      this.message = data;
    });

    // Handle connection events
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  },
};

export const socketClientService = new SocketClientService();
