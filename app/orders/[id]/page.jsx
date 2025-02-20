import axios from "axios";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation"; // Import the `notFound` helper from Next.js


const fetchOrder = async (orderId) => {
    try {
        const response = await axios.get(`http://localhost:3001/orders?id=${orderId}`, {
            next: { revalidatePath: 0 }
        });
        const data = response.data;

        if (data.length > 0) {
            return data[0]; // Return the first matching order
        }
    } catch (error) {
        console.error("Error fetching order:", error);
        return null; // Handle error
    }
};

const OrderDetailsPage = async ({ params }) => {
    const { id } = params; // This id is order_id
    const order = await fetchOrder(id);

    if (!order) {
        notFound(); // Triggers Next.js 404 page if no order is found
    }

    return (
        <section className="p-6">
            
            {/* order header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-dark-grey">Order {order.id}</h1>
                <p className="text lg text-dark-gray">Customer {order.customer_name}</p>
            </div>

            {/* order info */}
            <div className="mb-6 p-6 shadow-md rounded-md">
                <h3 className="text-lg text-dark-gray font-bold mb-1">Order Info</h3>
                <div>
                    <h4 className="text-ms text-dark-gray">
                        <strong>Status: </strong>{order.order_status}</h4>
                    <h4 className="text-sm text-dark-gray">
                        <strong>Total Amount: </strong>R{order.total_amount}</h4>
                    <h4 className="text-sm text-dark-gray">
                        <strong>Date: </strong>{order.order_date}</h4>
                </div>
            </div>

            {/* order details */}
            <div className="mb-6 p-6" >
                <h3 className="text-lg text-dark-gray font-bold mb-2">Order Items</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {
                        order.order_details?.map(order => (
                            <div key={order.dish} className="card shadow-md rounded-md p-3">
                                <Image src={order.image} alt="order image" width={300} height={150} style={{
                                    borderRadius: "3px"
                                }} />

                                <div className="card-body">
                                    <h4 className="text-dark-gray font-semibold text-lg py-1">{order.dish}</h4>
                                    <p className="text-md text-dark-gray">Price: {order.price}</p>
                                    <p className="text-md text-dark-gray">Quantity: {order.quantity}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="btn mb-6 py-4">
                    <Link href={`/orders/edit-order/${order.id}`}
                        className="bg-soft-blue text-dark-gray text-white px-4 py-2 rounded-md hover:bg-light-blue hover:text-black transition duration-300 ease-in-out">
                        View
                    </Link>
                    <button className="bg-red-500 text-white ml-4 px-4 py-2 rounded-md hover:bg-red-600">
                            Cancel Order
                    </button>
                </div>
            </div>
        
        </section>
    );
};

export default OrderDetailsPage;
