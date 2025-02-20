const { Server } = require('socket.io');
const http = require('http');

// Create a simple HTTP server
const server = http.createServer();

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for development
  },
});

// Handle client connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Example: Listen for order updates
  socket.on('order-update', (data) => {
    console.log('Order update received:', data);

    // Broadcast the update to all clients
    io.emit('order-status', `Order #${data.orderId} is now ${data.status}`);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
server.listen(3001, () => {
  console.log('Socket.IO server running on http://localhost:3001');
});
