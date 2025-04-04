"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const EditOrder = ({ params }) => {
    const route = useRouter();
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);
    const { id } = params; // Get the selected order's ID from params (via dynamic route)

    const socket = io('http://localhost:3001'); // Connect to the Socket.IO server

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/orders/${id}`); // Adjust the URL if needed
                if (response.status === 200) {
                    setOrder(response.data); // Set the order data
                    setOrderStatus(response.data.order_status); // Set the order status
                }
            } catch (err) {
                alert("Couldn't fetch data.\n" + err.message);
            }
        };

        if (id) {
            fetchOrder(); // Fetch the order only if id is available
        }
    }, [id]);

    if (!order) return <div>Loading...</div>; // Handle loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the order status in the backend
            const updatedOrder = {
                ...order,
                order_status: orderStatus,
            };

            await axios.put(`http://localhost:3000/api/orders/${order._id}`, updatedOrder); // Corrected API call

            // Emit updated order via Socket.IO
            socket.emit("order-status", updatedOrder);

            route.push(`/orders/`); // Redirect to the order details page
            alert("Order updated successfully!");
        } catch (err) {
            console.error("Error updating order!", err.message);
        }
    };

    return (
        <section className="p-6">
            <h1 className="text-3xl font-bold px-4">Edit Order {order?.order_number}</h1>
            <form className="p-4" onSubmit={handleSubmit}>
                {/* customer name */}
                <div className="mb-4">
                    <label htmlFor="customer_Name" className="mb-4 text-dark-gray text-lg">Customer Name: </label>
                    <input
                        type="text"
                        value={order?.customer_name}
                        className="text-lg p-2 w-full bg-light-gray border rounded-md"
                        disabled
                    />
                </div>

                {/* total amount */}
                <div className="mb-4">
                    <label htmlFor="Total Amount" className="mb-4 text-dark-gray text-lg">Total Amount: </label>
                    <input
                        type="text"
                        value={`R${order?.total_amount}`}
                        className="text-lg p-2 w-full bg-light-gray border rounded-md"
                        disabled
                    />
                </div>

                {/* update status */}
                <div className="mb-4">
                    <label htmlFor="Order Status" className="mb-4">Order Status: </label>
                    <select
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        className="rounded-md border w-full bg-light-gray p-2"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <button
                    className="px-[12px] py-2 mb-4 bg-soft-blue
                    text-light-gray text-[16px] rounded-md cursor-pointer transition duration-300
                    hover:bg-light-gray hover:text-dark-gray"
                >
                    Save Changes
                </button>
            </form>
        </section>
    );
};

export default EditOrder;
