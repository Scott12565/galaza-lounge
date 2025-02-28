const { Server } = require("socket.io");
const http = require("http");
// require("dotenv").config();
const connectDB = require("./config/dbConnect");
const Order = require("./models/orders");

// Connect to MongoDB
connectDB();

// Create HTTP server for Socket.IO
const server = http.createServer();

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Handle client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for order updates
  socket.on("update-order-status", async ({ orderId, newStatus }) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { order_status: newStatus },
        { new: true }
      );

      if (updatedOrder) {
        console.log("Broadcasting updated order:", updatedOrder);
        io.emit("order-status", updatedOrder);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  });

  // Listen for new orders
  socket.on("new-order", async (orderData) => {
    try {
      const newOrder = new Order(orderData);
      await newOrder.save();
      console.log("New Order Saved:", newOrder);
      io.emit("new-order", newOrder);
    } catch (error) {
      console.error("Error saving new order:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
