import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [isOpen, setIsopen] = useState(false);

  const toggleSidebar = () => {
    setIsopen(!isOpen);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        <AdminSidebar />
      </div>
      <div className="grow overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
}

export default AdminLayout;
