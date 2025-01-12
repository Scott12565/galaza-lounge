"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditOrder = ({ params }) => {
    const route = useRouter()
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);
    const { id } = params; // Get the selected order's ID from params (via dynamic route)

    useEffect(() => {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/orders/${id}`); // Fetch the specific order
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
        e.preventDefault()
            try {
                await axios.put(`http://localhost:3001/orders/${order.id}`, {
                    ...order,
                    order_status: orderStatus
                })
                route.push('/orders') // redirect user to order detail page
                alert("Order updated successfully!");
            } catch (err) {
                console.log("error updating order!", err.message)
            }
    }
        
    
    return ( 
        <section className="p-6">
            <h1 className="text-3xl font-bold px-4">Edit Order {order?.id}</h1>
            <form className="p-4"
            onSubmit={handleSubmit}>
                {/* customer name */}
                <div className="mb-4">
                    <label htmlFor="customer_Name" className="mb-4 text-dark-gray text-lg">Customer Name: </label>
                    <input 
                    type="text"
                    value={order?.customer_name}
                    className="text-lg p-2 w-full bg-light-gray border rounded-md"
                    disabled />
                </div>

                {/* total amount */}
                <div className="mb-4">
                    <label htmlFor="Total Amount" className="mb-4 text-dark-gray text-lg">Customer Name: </label>
                    <input 
                    type="text"
                    value={`R${order?.total_amount}`}
                    className="text-lg p-2 w-full bg-light-gray border rounded-md"
                    disabled />
                </div>

                {/* update status */}
                <div className="mb-4">
                    <label htmlFor="Order Status" className="mb-4">Order Status: </label>
                    <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} 
                    className="rounded-md border w-full bg-light-gray p-2">
                        <option name="Complete">Completed</option>
                        <option name="Complete">Pending</option>
                        <option name="Complete">Cancelled</option>
                    </select>
                </div>

                <button
                className="px-[12px] py-2 mb-4 bg-soft-blue 
                text-light-gray text-[16px] rounded-md cursor-pointer transition duration-300
                hover:bg-light-gray hover:text-dark-gray">
                    Save Changes
                </button>
            </form>
        </section>
     );
}
 
export default EditOrder;