import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCogs, FaBook, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white flex flex-col p-6 border-r border-gray-200">
      <h2 className="text-3xl font-extrabold text-blue-600 text-center mb-8">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaTachometerAlt className="mr-3 text-xl" /> Dashboard
        </NavLink>
        <NavLink 
          to="/options" 
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaCogs className="mr-3 text-xl" /> Options
        </NavLink>
        <NavLink 
          to="/standards" 
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaClipboardList className="mr-3 text-xl" /> Standards
        </NavLink>
        <NavLink 
          to="/books" 
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaBook className="mr-3 text-xl" /> Books
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
