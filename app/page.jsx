
import { 
  monetization, 
  receipt, 
  restaurant } from '@/public/icons';
import Image from 'next/image';

const fetchRecentOrders = async () => {
  const orderData = await fetch('http://localhost:3001/orders');
  return orderData.json();
};

const fetchDashBoardStats = async () => {
  const statsData = await fetch('http://localhost:3001/dashboardstats')
  return statsData.json();
}

const DashBoard = async () => {
  
  const recentOrders = await fetchRecentOrders();
  const dashboardstats = await fetchDashBoardStats();

  return ( 
    <section className="my-2 p-1 lg:p-6">
      {/* header */}
      <div className="mb-6">
        <h1 className="text-dark-gray font-bold text-3xl">Welcome to the Dashboard</h1>
        <p className="text-lg text-dark-gray">Here's an Overview of your restaurant's performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6 ">
        {/* stats cards */}
        
        {/* card-1 */}
        <div className="bg-white shadow-md rounded-md p-6 ">
          <div className="flex items-center justify-between ">
            <h3 className="font-bold text-lg">Total Orders</h3>
            <Image src={receipt} alt='receipt icon' width={30} height={30} />
          </div>
          <p className="text-3xl font-semibold mt-2">{dashboardstats?.total_orders}</p>
        </div>

        {/* card-2 */}
        <div className="bg-white shadow-md rounded-md p-6 ">
          <div className="flex items-center justify-between ">
            <h3 className="font-bold text-lg">Active Menu Items</h3>
            <Image src={restaurant} alt='restaurant icon' width={30} height={30} />
          </div>
          <p className="text-3xl font-semibold mt-2">{dashboardstats?.active_menu_items}</p>
        </div>

        {/* card-3 */}
        <div className="bg-white shadow-md rounded-md p-6 ">
          <div className="flex items-center justify-between ">
            <h3 className="font-bold text-lg">Total Revenue</h3>
            <Image src={monetization} alt='monetization icon' width={30} height={30} />
          </div>
          <p className="text-3xl font-semibold mt-2">R{dashboardstats?.total_revenue}</p>
        </div>

        {/* card-4 */}
        <div className="bg-white shadow-md rounded-md p-6 ">
          <div className="flex items-center justify-between ">
            <h3 className="font-bold text-lg">Pending Orders</h3>
            {/* <MdOutlineReceiptLong size={30} /> */}
            <Image src={receipt} alt='receipt icon' width={30} height={30} />
            
          </div>
          <p className="text-3xl font-semibold mt-2">{dashboardstats?.pending_orders}</p>
        </div>
      </div>

      {/*A table for Recent Orders */}
      <div className="bg-white p-6 mb-6 shadow-md rounded-md ">
        <h3 className="text-dark-gray text-2xl font-bold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className='bg-white min-w-full'>
            {/* table head */}
            <thead>
              <tr>
                <th className=' text-left px-4 py-2 font-semibold text-dark-gray text-md'>Order ID</th>
                <th className=' text-left px-4 py-2 font-semibold text-dark-gray text-md'>Cutomer</th>
                <th className=' text-left px-4 py-2 font-semibold text-dark-gray text-md'>Total</th>
                <th className=' text-left px-4 py-2 font-semibold text-dark-gray text-md'>Status</th>
              </tr>
            </thead>
            <tbody>

              {/* body table rows for data */}
              {recentOrders?.map(order => (
              <tr className="px-4 py-2" key={order.order_id}>
                <td className="px-4 py-2">{order.order_id}</td>
                <td className="px-4 py-2">{order.customer_name}</td>
                <td className="px-4 py-2">R{order.total_amount}</td>
                <td className={`px-4 py-2 ${order.order_status === "completed" ? "text-green-600" : "text-red-600"}`}>
                  {order.order_status}
                </td>
              </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* Menu Mangament */}
        <div className="bg-white p-6 mb-8 shadow-md rounded-md">
          <h3 className="text-2xl font-bold mb-4">Menu Management</h3>
          <p className='lg text-dark-gray'>Manage your active menu items. Add, edit, or remove items as needed.</p>
          <button className="bg-soft-blue text-white p-2 mt-4 rounded-md hover:text-dark-gray hover:bg-light-blue">Manage Menu</button>
        </div>
      
        {/* Announcements */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Announcements</h3>
          <p>Stay up to date with the latest updates and notifications for your restaurant.</p>
        </div>
    </section>
   );
}
 
export default DashBoard;