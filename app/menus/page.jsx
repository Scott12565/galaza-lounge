"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

// Category constants
const CATEGORIES = ["All", "Main", "Sides", "Drinks"];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Main");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get("http://localhost:3001/menuItems");
        if (res.data) {
          setMenuItems(res.data);
        }
      } catch (err) {
        console.error("Failed to get menu items:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      if (!image) {
        return alert("Please select an image.");
      }
  
      if (!image.type.startsWith("image/")) {
        return alert("Selected file is not an image.");
      }
  
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "mneu _image"); // Replace with your Cloudinary preset
      formData.append("cloud_name", "drnsgdvfy"); // Add your Cloudinary cloud name here if necessary
  
      // Log the formData before making the request to check if it's correct
      console.log("Uploading image:", formData);
  
      const imageUploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/drnsgdvfy/image/upload", 
        formData
      );
  
      const uploadedImageUrl = imageUploadResponse.data.secure_url;
      console.log("Uploaded Image URL:", uploadedImageUrl);
  
      const newMenuItem = {
        name,
        category,
        price,
        image: uploadedImageUrl,
      };
  
      const res = await axios.post("http://localhost:3001/menuItems", newMenuItem);
      if (res.status === 200) {
        setMenuItems((prev) => [...prev, res.data]);
        setName("");
        setCategory("Main");
        setPrice("");
        setImage(null);
        document.getElementById("fileInput").value = null; // Reset file input
      }
    } catch (err) {
      console.error("Failed to create new menu item:", err.message);
      alert("An error occurred while saving the menu item. Please try again.");
    }
  };
  

  const MenuItemCard = ({ item }) => (
    <div key={item.id} className="bg-white p-4 rounded-md shadow-md">
      <Image
        width={300}
        height={250}
        src={item.image || "/default-image.jpg"}
        alt={item.name}
        className="w-full h-48 object-cover rounded-md"
        priority
      />
      <h3 className="text-xl font-bold">{item.name}</h3>
      <p className="text-dark-gray text-lg">{item.category}</p>
      <h3 className="text-xl font-bold">R {item.price}</h3>
      <div className="flex justify-between mt-2">
        <button className="text-white bg-soft-blue py-2 px-4 rounded-md">
          Edit
        </button>
        <button className="text-white bg-soft-red py-2 px-4 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <section className="p-6">
      {/* Menu Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold py-2">Menu</h1>
        <p className="text-lg text-dark-gray">
          Manage your menu items, add new items, or edit existing ones.
        </p>
      </div>

      {/* Filter by Category */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Filter by Category</h3>
        <div className="flex gap-4">
          {CATEGORIES.map((cat, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-md transition duration-300 ${
                selectedCategory === cat
                  ? "bg-light-blue hover:bg-soft-blue"
                  : "bg-soft-blue hover:bg-light-blue"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div>Loading menu items...</div>
        ) : filteredMenuItems.length === 0 ? (
          <div>No menu items available</div>
        ) : (
          filteredMenuItems.map((item) => <MenuItemCard key={item.id} item={item} />)
        )}
      </div>

      {/* Create New Menu Item */}
      <div className="mb-4 mt-6">
        <h1 className="text-2xl font-bold mb-4">Create New Menu Item</h1>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="text-dark-gray font-semibold mb-2">Item Name</label>
            <input
              type="text"
              placeholder="Enter item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 py-4 border rounded-md"
            />
          </div>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="mb-4 w-full border rounded-md p-4"
          >
            {CATEGORIES.slice(1).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="mb-4">
            <label className="text-dark-gray font-semibold mb-2">Price</label>
            <input
              type="text"
              placeholder="Enter item price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 py-4 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="text-dark-gray font-semibold mb-2">Image</label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 py-4 border rounded-md"
            />
          </div>
          <button className="bg-soft-blue text-white text-lg py-1 px-2 hover:bg-light-blue rounded-md shadow-md">
            Save Item
          </button>
        </form>
      </div>
    </section>
  );
};

export default Menu;
