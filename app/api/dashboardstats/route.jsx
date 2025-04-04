import connectDB from "@/backend/config/dbConnect"; // Ensure correct import path
import DashboardStats from "@/backend/models/dashboardStats";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB(); // Ensure database connection
    const stats = await DashboardStats.find(); // Fetch all stats

    return NextResponse.json(stats || [], { status: 200 }); // Always return an array
  } catch (err) {
    console.error("Error fetching dashboard stats:", err.message);
    
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection
    const { total_orders, active_menu_items, total_revenue, pending_orders } = await req.json();

    // Validate required fields
    if (
      !total_orders ||
      !active_menu_items ||
      !total_revenue ||
      !pending_orders     ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newStat = new DashboardStats({ total_orders, active_menu_items, total_revenue, pending_orders });
    await newStat.save();

    return NextResponse.json({ message: "Dashboard stats added successfully!", data: newStat }, { status: 201 });
  } catch (err) {
    console.error("Error adding dashboard stats:", err.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}