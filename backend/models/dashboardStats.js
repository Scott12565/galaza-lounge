import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema({
  total_orders: { type: Number, required: true },
  active_menu_items: { type: Number, required: true },
  total_revenue: { type: Number, required: true },
  pending_orders: { type: Number, required: true },
});

// Prevent re-registering the model if already registered
const DashboardStats = mongoose.models.DashboardStats || mongoose.model("DashboardStats", DashboardSchema);

export default DashboardStats;
