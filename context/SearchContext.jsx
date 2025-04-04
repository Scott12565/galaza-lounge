"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const searchContext = createContext();

const fetchRecentOrders = async () => {
  try {
    const response = await axios.get("/api/orders");
    console.log("Recent Orders fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
};

const fetchDashboardStats = async () => {
  try {
    const response = await axios.get("/api/dashboardstats");
    console.log("Dashboard Stats fetched:", response.data);
    return response.data || []; // Ensure it's always an array
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return [];
  }
};

export default function SearchContextProvider({ children }) {
  const [recentOrders, setRecentOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchRecentOrders();
      const stats = await fetchDashboardStats();

      setRecentOrders(orders);
      setDashboardStats(stats); // Now it's an array
      setFilteredOrders(orders);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    // Handle order updates in real-time
    socket.on("order-updated", (updatedOrder) => {
      setRecentOrders((prevOrders) => {
        const existingOrderIndex = prevOrders.findIndex(
          (order) => order.order_number === updatedOrder.order_number
        );
        if (existingOrderIndex !== -1) {
          const updatedOrders = [...prevOrders];
          updatedOrders[existingOrderIndex] = updatedOrder;
          return updatedOrders;
        } else {
          return [...prevOrders, updatedOrder];
        }
      });

      setFilteredOrders((prevOrders) => {
        const existingOrderIndex = prevOrders.findIndex(
          (order) => order.order_number === updatedOrder.order_number
        );
        if (existingOrderIndex !== -1) {
          const updatedOrders = [...prevOrders];
          updatedOrders[existingOrderIndex] = updatedOrder;
          return updatedOrders;
        } else {
          return [...prevOrders, updatedOrder];
        }
      });
    });

    // Handle order status updates in real-time
    socket.on("order-status", (updatedOrder) => {
      setRecentOrders((prevOrders) => {
        const existingOrderIndex = prevOrders.findIndex(
          (order) => order.order_number === updatedOrder.order_number
        );
        if (existingOrderIndex !== -1) {
          const updatedOrders = [...prevOrders];
          updatedOrders[existingOrderIndex] = updatedOrder;
          return updatedOrders;
        } else {
          return [...prevOrders, updatedOrder];
        }
      });

      setFilteredOrders((prevOrders) => {
        const existingOrderIndex = prevOrders.findIndex(
          (order) => order.order_number === updatedOrder.order_number
        );
        if (existingOrderIndex !== -1) {
          const updatedOrders = [...prevOrders];
          updatedOrders[existingOrderIndex] = updatedOrder;
          return updatedOrders;
        } else {
          return [...prevOrders, updatedOrder];
        }
      });
    });

    return () => socket.disconnect();
  }, []);

  const handleQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!recentOrders.length) return;

    const searchResults = recentOrders.filter((order) =>
      order.order_status.toLowerCase().includes(query.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredOrders(searchResults);
  };

  // New function to create an order and emit the event to the socket server
  const createOrder = async (orderData) => {
    try {
      const response = await axios.post("/api/orders", orderData); // Call your API to save the order

      if (response.status === 201) {
        const socket = io("http://localhost:3001");
        socket.emit('new-order', orderData); // Emit the 'new-order' event to update other clients
        socket.disconnect();
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <searchContext.Provider
      value={{
        handleQuery,
        searchQuery,
        filteredOrders,
        recentOrders,
        dashboardStats,
        createOrder, // Add createOrder to context so it can be used in components
      }}
    >
      {children}
    </searchContext.Provider>
  );
}
