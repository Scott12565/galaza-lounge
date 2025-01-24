// src/components/Search.js
"use client";

import { useContext } from "react"; // Ensure this is imported
import { searchContext } from "@/context/SearchContext";
import Image from "next/image";
import search from "@/public/icons/search.svg"; // Update path if needed

const Search = () => {
  const { handleQuery, searchQuery } = useContext(searchContext);

  return (
    <div className="relative flex items-center w-full">
      {/* Search Icon */}
      <div className="absolute left-3">
        <Image
          src={search}
          alt="Search Icon"
          width={20}
          height={20}
          className="text-gray-400"
        />
      </div>

      {/* Search Input */}
      <input
        type="text"
        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={handleQuery}
      />
    </div>
  );
};

export default Search;
