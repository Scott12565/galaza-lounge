'use client'
import Image from "next/image";

const Menu = () => {
  // Dummy data
  // const menuItems = [
  //   { id: 1, name: 'Burger', category: 'Main', price: 'R85', image: '/images/burger.jpg' },
  //   { id: 2, name: 'Pizza', category: 'Main', price: 'R120', image: '/images/pizza.jpg' },
  //   { id: 3, name: 'Fries', category: 'Sides', price: 'R45', image: '/images/fries.jpg' },
  //   { id: 4, name: 'Coke', category: 'Drinks', price: 'R25', image: '/images/coke.jpg' },
  //   { id: 5, name: 'Salad', category: 'Sides', price: 'R60', image: '/images/salad.jpg' },
  // ];

  const menuItems = [
    {id: 1, name: 'Fries', price: 'R45', category: 'Side', image: '/images/fries.jpg'},
    {id: 2, name: 'Burger', price: 'R75', category: 'Main', image: '/images/burger.jpg'},
    {id: 3, name: 'Coke', price: 'R23', category: 'Drinks', image: '/images/coke.jpg'},
    {id: 4, name: 'Salad', price: 'R40', category: 'Side', image: '/images/salad.jpg'},
  ]

  const categories = ['All', 'Main', 'Sides', 'Drinks'];

  return (
    <section className="p-6">
      {/* Menu Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold py-2">Menu</h1>
        <p className="text-lg text-dark-gray">Manage your menu items, add new items or edit existing one.</p>
      </div>

      {/* Filter by Category */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Filter by Category</h3>
        <div className="flex gap-4">
          {categories.map((category, index) => (
            <button key={index} className="bg-soft-blue text-white py-2 px-4 rounded-md hover:bg-light-blue">
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Item */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Menu Item Card */}
        {menuItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-md shadow-md ">
            <Image width={300}
              height={250}
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-fill rounded-md"
            />
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-dark-gray text-lg">{item.category}</p>
            <h3 className="text-xl font-bold">{item.price}</h3>

            {/* Action Button */}
            <div className="flex justify-between mt-2">
              <button className="text-white bg-light-blue py-2 px-4 rounded-md">Edit</button>
              <button className="text-white bg-soft-red py-2 px-4 rounded-md">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Menu Items */}
      <div className="mb-4 mt-6">
        <h1 className="text-2xl font-bold mb-4">Create New Menu Item</h1>

        {/* Form to Create Menu Items */}
        <form onSubmit={() => {}} 
        className="w-full">
          <div className="mb-4">
            <label htmlFor="Item Name" className="text-dark-gray font-semibold mb-2">Item Name</label>
            <input type="text" 
            placeholder="Enter item name" 
            value={''} 
            onChange={() => {}}
            className="w-full p-4 border rounded-md "/>
          </div>

          <select onChange={() => {}} name="item category" className="mb-4 w-full border rounded-md p-4">
            <option value={''}>Main</option>
            <option value={''}>Drinks</option>
            <option value={''}>Sides</option>
          </select>

          <div className="mb-4">
            <label htmlFor="Item price" className="text-dark-gray font-semibold mb-2">Price</label>
            <input type="text" 
            placeholder="Enter item Price" 
            value={''}
            onChange={() => {}}
            className="w-full p-4 border rounded-md "/>
          </div>

          <div className="mb-4">
            <label htmlFor="Select image" className="text-dark-gray font-semibold mb-2">Image</label>
            <input type="file"
            onChange={() => {}} 
            className="w-full p-4 border rounded-md "/>
          </div>
          <button className='bg-soft-blue text-white text-lg py-1 px-2 hover:bg-light-blue rounded-md shadow-md' >Save Item</button>
        </form>
      </div>
    </section>
  );
};

export default Menu;
