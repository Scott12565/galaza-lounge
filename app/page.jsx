"use client";
import { searchContext } from "@/context/SearchContext";
import { monetization, receipt, restaurant } from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const DashBoard = () => {
  const { recentOrders, dashboardStats, 
    filteredOrders, handleQuery, searchQuery } = useContext(searchContext);
    const router = useRouter();

    console.log("Recent Orders: ", recentOrders);
    console.log("Dashboard Stats: ", dashboardStats);
    console.log("Search Query: ", searchQuery);

    useEffect(() => {
      if (!dashboardStats || !recentOrders) {
        router.push("/404"); // Redirect to 404 page if data is missing
      }
    }, [dashboardStats, recentOrders]);
  
    if (!dashboardStats || !recentOrders) {
      return null; // Prevent rendering while redirecting
    }

  return (
    <section className="my-2 p-1 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-dark-gray font-bold text-3xl">Welcome to the Dashboard</h1>
        <p className="text-lg text-dark-gray">Here's an Overview of your restaurant's performance</p>
      </div>

      {/* Stats */}
      {dashboardStats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {dashboardStats.map((stat, index) => (
            <>
              <div key={`total_orders-${stat._id}`} className="bg-white shadow-md rounded-md p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Total Orders</h3>
                  <Image src={receipt} alt="receipt icon" width={30} height={30} />
                </div>
                <p className="text-3xl font-semibold mt-2">{stat.total_orders || 0}</p>
              </div>

              <div key={`active_menu_items-${index}`} className="bg-white shadow-md rounded-md p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Active Menu Items</h3>
                  <Image src={restaurant} alt="restaurant icon" width={30} height={30} />
                </div>
                <p className="text-3xl font-semibold mt-2">{stat.active_menu_items || 0}</p>
              </div>

              <div key={`total_revenue-${index}`} className="bg-white shadow-md rounded-md p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Total Revenue</h3>
                  <Image src={monetization} alt="monetization icon" width={30} height={30} />
                </div>
                <p className="text-3xl font-semibold mt-2">R{stat.total_revenue || 0}</p>
              </div>

              <div key={`pending_orders-${index}`} className="bg-white shadow-md rounded-md p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Pending Orders</h3>
                  <Image src={receipt} alt="receipt icon" width={30} height={30} />
                </div>
                <p className="text-3xl font-semibold mt-2">{stat.pending_orders || 0}</p>
              </div>
            </>
          ))}
        </div>
      )}


      {/* Recent Orders */}
      {recentOrders && (
        <div className="bg-white p-6 mb-6 shadow-md rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-dark-gray text-2xl font-bold">Recent Orders</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="bg-white min-w-full">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">Order ID</th>
                  <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">Customer</th>
                  <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">Total</th>
                  <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr className="px-4 py-2" key={order.order_number}>
                      <td className="px-4 py-2">
                        <Link href={`/orders/${order.id}`}>{order.order_number}</Link>
                      </td>
                      <td className="px-4 py-2">
                        <Link href={`/orders/${order.id}`}>{order.customer_name}</Link>
                      </td>
                      <td className="px-4 py-2">
                        <Link href={`/orders/${order.id}`}>R{order.total_amount}</Link>
                      </td>
                      <td
                        className={`px-4 py-2 ${
                          order.order_status === "completed" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <Link href={`/orders/${order.id}`}>{order.order_status}</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                      No orders match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Menu Management */}
      <div className="bg-white p-6 mb-8 shadow-md rounded-md">
        <h3 className="text-2xl font-bold mb-4">Menu Management</h3>
        <p className="text-dark-gray">Manage your active menu items. Add, edit, or remove items as needed.</p>
        <button className="bg-soft-blue text-white p-2 mt-4 rounded-md hover:text-dark-gray hover:bg-light-blue">
          <Link href={`/menus`}>Manage Menu</Link>
        </button>
      </div>

      {/* Announcements */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">Announcements</h3>
        <p>Stay up to date with the latest updates and notifications for your restaurant.</p>
      </div>
    </section>
  );
};

export default DashBoard;
