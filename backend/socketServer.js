const connectDB = require("./config/dbConnect");
const Order = require("./models/orders");
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(express.json());

connectDB();

// Store global reference to Socket.io
global.io = io;

// **Socket.io Connection**
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for order-status updates and update the order in the database
    socket.on('order-status', async (updatedOrder) => {
        try {
            // Find and update the order by its ID
            const updated = await Order.findByIdAndUpdate(updatedOrder._id, updatedOrder, { new: true });

            // Emit the updated order to all connected clients
            io.emit('order-updated', updated);
            console.log('Order status updated:', updated);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    });

    // When an order is received via WebSockets (new-order)
    socket.on('new-order', async (orderData) => {
        try {
            // Generate a unique order number
            const order_number = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            orderData.order_number = order_number;

            // Create and save a new order
            const newOrder = new Order(orderData);
            const savedOrder = await newOrder.save();

            // Notify all clients of the new order
            io.emit('order-updated', savedOrder);
            console.log('New order created:', savedOrder);
        } catch (error) {
            console.error('Error saving order:', error);
        }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🚀 Server running with Express & Socket.io on port ${PORT}`);
});
