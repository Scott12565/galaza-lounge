const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    registered_at: () => Date.now()
})

module.exports = mongoose.model('Customers', customerSchema)