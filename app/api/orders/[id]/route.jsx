// app/api/orders/[id]/route.js

import connectDB from "@backend/config/dbConnect";
import Order from "@backend/models/orders";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params; // Get the order ID from the route params

  try {
    await connectDB(); // Ensure the DB connection is established
    const order = await Order.findById(id); // Find the order by ID

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.error("Error fetching order:", err.message);
    return NextResponse.json({ message: "Error fetching order", error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
    try {
      const { id } = params;
      const updatedData = await req.json();
  
      // Find and update the order by ID
      const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedOrder) {
        return NextResponse.error({ status: 404, statusText: 'Order not found' });
      }
  
      return NextResponse.json(updatedOrder);
    } catch (error) {
      return NextResponse.error({ status: 500, statusText: 'Error updating order' });
    }
  }