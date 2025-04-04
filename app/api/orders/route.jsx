import connectDB from "@backend/config/dbConnect";
import Order from "@backend/models/orders";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const orders = await Order.find(); // Fetch all orders
    return Response.json(orders, { status: 200 });
  } catch (err) {
    console.error("Could not fetch orders:", err.message);
    return Response.json([], { status: 500 }); // Return an empty array if there's an error
  }
}

export async function POST(req) {
    try {
      await connectDB();
  
      // Parse the request body
      const body = await req.json();
      console.log("Received Data:", body); // Log the entire request body
  
      // Ensure "orders" exists and is an array
      if (!body.orders || !Array.isArray(body.orders) || body.orders.length === 0) {
        return NextResponse.json({ message: "Orders array is required and cannot be empty" }, { status: 400 });
      }
  
      const savedOrders = [];
  
      for (const order of body.orders) {
        const { customer_name, total_amount, order_status, order_details } = order;
  
        // Validate required fields
        if (!customer_name || !total_amount || !order_status || !order_details || !Array.isArray(order_details)) {
          console.error("Missing required fields in:", order); // Log missing data
          return NextResponse.json({ message: "All fields are required for each order" }, { status: 400 });
        }
  
        // Generate a unique order number
        const order_number = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
        // Create and save the order
        const newOrder = new Order({
          order_number,
          customer_name,
          total_amount,
          order_status,
          order_details,
        });
  
        const savedOrder = await newOrder.save();
        savedOrders.push(savedOrder);
  
        // Emit real-time event
        if (global.io) {
          global.io.emit("order-updated", savedOrder);
        }
      }
  
      return NextResponse.json({ message: "Orders added successfully", orders: savedOrders }, { status: 201 });
    } catch (err) {
      console.log("Failed to add data to database:", err.message);
      return NextResponse.json({ message: "Failed to add data to database", error: err.message }, { status: 500 });
    }
  }
  