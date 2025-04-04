const mongoose = require("mongoose");

// Define the Order schema
const OrderSchema = new mongoose.Schema({
  order_number: {
    type: String,
    required: true,
    unique: true
  },
  customer_name: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    required: true,
  },
  order_details: [
    {
      dish: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
}, { timestamps: true });

// Check if the model already exists
module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
