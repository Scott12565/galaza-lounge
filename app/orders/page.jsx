"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { searchContext } from "@/context/SearchContext";

const OrdersPage = () => {
  const { filteredOrders } = useContext(searchContext);

  return (
    <section className="my-2 p-1 lg:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-2">
          <h1 className="text-dark-gray font-bold text-3xl">Orders</h1>
          <p className="text-lg text-dark-gray">Manage your restaurant orders</p>
        </div>
      </div>

      {/* Orders list */}
      <div className="mb-6 p-6 bg-white rounded-md shadow-md">
        <h3 className="text-dark-gray text-2xl font-bold mb-4">Order list</h3>

        {/* Orders table */}
        <div className="overflow-x-auto">
          <table className="bg-white min-w-full">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">
                  Order Number
                </th>
                <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">
                  Customer
                </th>
                <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">
                  Total
                </th>
                <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">
                  Status
                </th>
                <th className="text-left px-4 py-2 font-semibold text-dark-gray text-md">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="py-6">
                    <td className="px-4 py-2">{order.order_number}</td>
                    <td className="px-4 py-2">{order.customer_name}</td>
                    <td className="px-4 py-2">R{order.total_amount}</td>
                    <td
                      className={`px-4 py-2 ${
                        order.order_status === "completed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.order_status}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        href={`/orders/${order._id}`}
                        className="bg-soft-blue px-4 py-1 text-light-gray hover:bg-light-blue hover:text-dark-gray cursor-pointer transition-all duration-500 rounded-md"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
