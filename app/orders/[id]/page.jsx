import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const fetchOrder = async (orderId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order:", error);
        return null; // Return null if the fetch fails
    }
};

const OrderDetailsPage = async ({ params }) => {
    const { id } = params; // No need to await params, it's already available
    const order = await fetchOrder(id); // Fetch the order details by ID

    if (!order) {
        return <p>Order not found</p>; // Handle error gracefully
    }

    return (
        <section className="p-6">
            {/* Order Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-dark-gray">Order {order.order_number}</h1>
                <p className="text-lg text-dark-gray">Customer: {order.customer_name}</p>
            </div>

            {/* Order Info */}
            <div className="mb-6 p-6 shadow-md rounded-md bg-white">
                <h3 className="text-lg text-dark-gray font-bold mb-1">Order Info</h3>
                <div>
                    <h4 className="text-md text-dark-gray">
                        <strong>Status: </strong> {order.order_status}
                    </h4>
                    <h4 className="text-md text-dark-gray">
                        <strong>Total Amount: </strong> R{order.total_amount}
                    </h4>
                    <h4 className="text-md text-dark-gray">
                        <strong>Date: </strong> {new Date(order.createdAt).toLocaleDateString()}
                    </h4>
                </div>
            </div>

            {/* Order Items */}
            <div className="mb-6 p-6 bg-white shadow-md rounded-md">
                <h3 className="text-lg text-dark-gray font-bold mb-2">Order Items</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {order.order_details?.map((item, index) => (
                        <div key={index} className="shadow-md rounded-md p-3 bg-gray-100">
                            <Image
                                src={item.image}
                                alt={item.dish}
                                width={300}
                                height={150}
                                className="rounded-md"
                                layout="intrinsic"
                            />
                            <div className="mt-3">
                                <h4 className="text-dark-gray font-semibold text-lg">{item.dish}</h4>
                                <p className="text-md text-dark-gray">Price: R{item.price}</p>
                                <p className="text-md text-dark-gray">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                    <Link
                        href={`/orders/edit-order/${order._id}`}
                        className="bg-soft-blue text-white px-4 py-2 rounded-md hover:bg-light-blue transition duration-300"
                    >
                        Edit Order
                    </Link>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                        Cancel Order
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OrderDetailsPage;
