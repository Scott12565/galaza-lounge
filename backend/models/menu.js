const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    dish: String,
    price: Number,
    category: {
        type: String,
        enum: ["main", "side", "drinks"],
        default: "main",},
        image: String,
})

module.exports = mongoose.model('Menu',menuSchema);