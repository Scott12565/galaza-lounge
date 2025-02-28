const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_name: String,
  total_amount: Number,
  order_status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
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

module.exports = mongoose.model("Order", orderSchema);
