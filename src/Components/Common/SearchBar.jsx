import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function SearchBar() {
  const [searchTerm, setSearchterm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("seacr Item:", searchTerm);
    setIsOpen(false);
  }
  return (
    <div
      className={`flex justify-center items-center transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}
    >
      {isOpen ? (
        <form onSubmit={handleSubmit} className="flex justify-center items-center w-full">
          <div className="relative w-2/3 md:w-1/2">
            <input
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={(e) => setSearchterm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <IoSearch className="h-6 w-6" />
            </button>
          </div>
          <button onClick={handleClick}>
            <IoClose className="ml-2 h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleClick}>
          <IoSearch className="h-6 w-6 text-center" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
