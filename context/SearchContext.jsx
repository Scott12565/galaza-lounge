"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const searchContext = createContext();

const fetchRecentOrders = async () => {
  try {
    const response = await axios.get("http://localhost:3001/orders");
    return response.data; // Adjust according to your JSON server structure
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
};

const fetchDashboardStats = async () => {
  try {
    const response = await axios.get("http://localhost:3001/dashboardstats");
    return response.data; // Adjust according to your JSON server structure
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {};
  }
};

export default function SearchContextProvider({ children }) {
  const [recentOrders, setRecentOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchRecentOrders();
      const stats = await fetchDashboardStats();
      setRecentOrders(orders);
      setDashboardStats(stats);
      setFilteredOrders(orders); // Initially, show all orders
    };
    fetchData();
  }, []);

  // Handle search and filter
  const handleQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter orders based on query
    const searchResults = recentOrders.filter((order) =>
      order.order_status.toLowerCase().includes(query.toLowerCase()) || 
      order.customer_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredOrders(searchResults);
  };

  return (
    <searchContext.Provider
      value={{
        handleQuery,
        searchQuery,
        filteredOrders,
        recentOrders,
        dashboardStats,
      }}
    >
      {children}
    </searchContext.Provider>
  );
}
