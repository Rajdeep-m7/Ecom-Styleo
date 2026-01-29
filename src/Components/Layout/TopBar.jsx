import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

function TopBar() {
  return (
    <div className="bg-[#ea5e0e] text-white ">
      <div className="container mx-auto md:flex justify-between items-center md:px-4 py-2">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-blue-500 transition">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>
        <div className="text-center text-sm grow ">
            <p>We shipped worldwide , fast and reliable shipping !</p>
        </div>
        <div className="text-sm hidden md:block">
            <a href="tel: 9832349268">+9832349168</a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
