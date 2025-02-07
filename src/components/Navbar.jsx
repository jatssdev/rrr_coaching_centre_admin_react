import React from 'react';
import { FaUserCircle, FaBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="w-full bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-700">Admin Dashboard</h2>
      <div className="flex items-center space-x-6">
        <button className="relative text-gray-600 hover:text-blue-600">
          <FaBell className="text-2xl" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
          <FaUserCircle className="text-2xl" />
          <span className="text-sm font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
