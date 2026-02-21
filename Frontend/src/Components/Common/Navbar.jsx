import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { FaInstagram, FaMeta, FaXTwitter } from "react-icons/fa6";

import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

function Navbar() {
  const [cart, setCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-3 sm:px-10 mt-1">
        <Link to="/" className="text-2xl font-bold">
          Styleo
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Link className="text-gray-800" to="/collection?gender=Men">
            Men
          </Link>
          <Link className="text-gray-800" to="/collection?gender=Women">
            Women
          </Link>
          <Link className="text-gray-800" to="/collection?category=Top Wear">
            Top wear
          </Link>
          <Link className="text-gray-800" to="/collection?category=Bottom Wear">
            Bottom wear
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin" className="px-2 text-sm rounded bg-black text-white">Admin
          </Link>
          <Link to="/profile">
            <AiOutlineUser className="h-6 w-6" />
          </Link>

          <div className="relative">
            <IoCartOutline
              className="h-6 w-6 cursor-pointer"
              onClick={() => setCart(true)}
            />
            <p className="absolute -top-1 right-0 text-white text-xs bg-orange-600 rounded-full px-1">
              3
            </p>
          </div>

          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button className="md:hidden" onClick={toggleNavBar}>
            <RiMenu3Fill className="h-6 w-6" />
          </button>
        </div>
      </div>

      <CartDrawer cart={cart} setCart={setCart} />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleNavBar}
        />
      )}
      <div
        className={`fixed z-50 w-1/2 sm:w-1/3 md:hidden h-full bg-white top-0 left-0
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mt-10 h-full p-3 relative overflow-y-auto">
          <button onClick={toggleNavBar}>
            <IoClose className="absolute w-6 h-6 top-1 right-1" />
          </button>

          <h1 className="font-semibold text-gray-900">NavBar Menu</h1>

          <div className="flex flex-col gap-2 mt-4">
            <Link to="/collection?gender=Men" onClick={toggleNavBar}>
              Men
            </Link>
            <Link to="/collection?gender=WoMen" onClick={toggleNavBar}>
              Women
            </Link>
            <Link to="/collection?category=Top Wear" onClick={toggleNavBar}>
              Top wear
            </Link>
            <Link to="/collection?category=Bottom Wear" onClick={toggleNavBar}>
              Bottom wear
            </Link>
          </div>

          <div className="fixed bottom-0 left-0 flex gap-4 pl-3 pb-3 text-xl bg-white w-full">
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaXTwitter />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <FaMeta />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
