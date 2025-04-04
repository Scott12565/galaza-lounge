const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: { type: Date, default: Date.now },
    last_login: Date
})

module.exports = mongoose.model('User', userSchema);