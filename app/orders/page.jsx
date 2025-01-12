import Link from 'next/link';
import { search, filter } from '@/public/icons';
import Image from 'next/image';
import axios from 'axios';

const fetchOrders = async () => {
  const orders = await axios.get('http://localhost:3001/orders', {
    next: { revalidate: 0 },
  });
  return orders.data;
};

const OrdersPage = async () => {
  const orders = await fetchOrders();

  return (
    <section className="my-2 p-1 lg:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-2">
          <h1 className="text-dark-gray font-bold text-3xl">Orders</h1>
          <p className="text-lg text-dark-gray">Manage your restaurant orders</p>
        </div>

        <div className="flex items-center mb-4">
          <button className="px-5 py-2 mr-3 flex items-center justify-center border rounded-md">
            <Image src={filter} alt="filter icon" width={30} height={30} />
            <span className="text-lg text-dark-gray">Filter</span>
          </button>

          <div className="p-1.5 bg-light-gray flex items-center justify-between border border-gray-300 rounded-md">
            <Image src={search} alt="search icon" width={30} height={30} />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-10/12 h-full bg-transparent text-xl pb-1 text-dark-gray focus:outline-none"
              disabled
            />
          </div>
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
                  Order ID
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
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer_name}</td>
                  <td className="px-4 py-2">R{order.total_amount}</td>
                  <td
                    className={`px-4 py-2 ${
                      order.order_status === 'completed'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {order.order_status}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/orders/${order.id}`}
                      className="bg-soft-blue px-4 py-1 text-light-gray hover:bg-light-blue hover:text-dark-gray cursor-pointer transition-all duration-500 rounded-md"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
