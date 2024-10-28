const fetchOrder = async (orderId) => {
    const response = await fetch(`http://localhost:3001/orders?order_id=${orderId}`);
    const data = await response.json();
    return data[0]; // Assuming you want the first matching order
};

const generateStaticParams = async () => {
    const response = await fetch('http://localhost:3001/orders');
    const orders = await response.json();
    return orders.map((order) => ({
        id: order.order_id, // Use order_id to match your structure
    }));
};

const OrderDetailsPage = async ({ params }) => {
    const { id } = params; // This id is order_id
    const order = await fetchOrder(id);

    return (
        <section className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-dark-gray">Order {order?.order_id}</h1>
                <p className="lg text-dark-gray">Customer: {order?.customer_name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="bg-white shadow-md rounded-md p-6">
                    <h3 className="font-bold text-lg mb-2">Order Info</h3>
                    <p><strong>Status:</strong> {order?.order_status}</p>
                    <p><strong>Total Amount:</strong> R{order?.total_amount}</p>
                    {/* If you have items, display them here */}
                    <p><strong>Date:</strong> {order?.date}</p>
                </div>
            </div>

            <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">
                    Edit Order
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Cancel Order
                </button>
            </div>
        </section>
    );
};

export default OrderDetailsPage;
