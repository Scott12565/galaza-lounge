const mongoose = require('mongoose')

const announceSchema = new mongoose.Schema({
    title:String,
    content: String,
    createdAt: Date(),
    auther: String,
})

module.exports = mongoose.model('Annoncement', announceSchema)