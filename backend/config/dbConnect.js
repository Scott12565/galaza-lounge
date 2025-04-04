const mongoose = require('mongoose');

let isConnected = false; // Track connection status

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/galaza_lounge');
        isConnected = conn.connections[0].readyState === 1;
        console.log('Connected to database');
    } catch (err) {
        console.log('Failed to connect to DB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
