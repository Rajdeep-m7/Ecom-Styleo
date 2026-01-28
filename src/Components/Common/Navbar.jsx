import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [cart, setCart] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const toggleNavBar = () => {
    setIsopen(!isOpen);
  };
  return (
    <>
      <div className="flex justify-between items-center px-3 sm:px-10 mt-1">
        <div>
          <Link to="/" className="text-2xl font-bold">
            Styleo
          </Link>
        </div>
        <div className="hidden md:flex justify-center items-center gap-3">
          <Link className="text-gray-800" to="#">
            Men
          </Link>
          <Link className="text-gray-800" to="#">
            Women
          </Link>
          <Link className="text-gray-800" to="#">
            Top wear
          </Link>
          <Link className="text-gray-800" to="#">
            Bottom wear
          </Link>
        </div>
        <div className="flex items-center justify-self-center gap-3 ">
          <Link to="/profile">
            <AiOutlineUser className="h-6 w-6" />
          </Link>
          <div className="relative">
            <Link>
              <IoCartOutline
                className="h-6 w-6"
                onClick={() => setCart(true)}
              />
            </Link>
            <p className="absolute -top-1  right-0 text-white text-xs bg-orange-600 rounded-full px-1">
              3
            </p>
          </div>
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button className="md:hidden">
            <RiMenu3Fill className="h-6 w-6" onClick={toggleNavBar} />
          </button>
        </div>
      </div>
      <CartDrawer cart={cart} setCart={setCart} />
      <div
        className={`fixed z-50 w-1/2 sm:w-1/3 md:hidden h-full bg-white top-0 left-0
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mt-10 p-3 relative">
          <button onClick={toggleNavBar}>
            <IoClose className="absolute w-6 h-6 top-1 right-1" />
          </button>

          <h1 className="font-semibold text-gray-900">NavBar Menu</h1>

          <div className="flex flex-col gap-2 mt-4">
            <Link className="text-gray-800" onClick={toggleNavBar} to="#">
              Men
            </Link>
            <Link className="text-gray-800" onClick={toggleNavBar} to="#">
              Women
            </Link>
            <Link className="text-gray-800" onClick={toggleNavBar} to="#">
              Top wear
            </Link>
            <Link className="text-gray-800" onClick={toggleNavBar} to="#">
              Bottom wear
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
