const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/');
        console.log('connected to database')
    } catch (err) {
        console.log('failed to connect to db', err.message)
        process.exit(1);
    }
}

module.exports = connectDB;