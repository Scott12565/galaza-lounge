const { Server } = require('socket.io');
const http = require('http');

// Create a basic HTTP server for Socket.IO
const server = http.createServer();

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for development purposes
  },
});

// Handle client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

    // Listen for order updates from clients
    // Handle order updates
    socket.on("order-status", (updatedOrder) => {
      console.log("Broadcasting updated order:", updatedOrder);
      io.emit("order-status", updatedOrder); // Broadcast full object
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
});

// Start the Socket.IO server
server.listen(3002, () => {
  console.log('Socket.IO server running on http://localhost:3002');
});
