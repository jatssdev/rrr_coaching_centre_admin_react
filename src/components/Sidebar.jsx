import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaCogs, FaBook, FaClipboardList, FaFlask, FaLightbulb, FaBookReader
} from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white flex flex-col p-6 border-r border-gray-200">
      <h2 className="text-3xl font-extrabold text-primary text-center mb-8">Rahul Raval</h2>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaTachometerAlt className="mr-3 text-xl text-primary" /> Dashboard
        </NavLink>
        <NavLink
          to="/options"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaCogs className="mr-3 text-xl text-primary" /> Options
        </NavLink>
        <NavLink
          to="/standards"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaClipboardList className="mr-3 text-xl text-primary" /> Standards
        </NavLink>
        <NavLink
          to="/books"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <GiOpenBook className="mr-3 text-xl text-primary" /> Books
        </NavLink>
        <NavLink
          to="/scientists"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaFlask className="mr-3 text-xl text-primary" /> Scientists
        </NavLink>
        <NavLink
          to="/jivvikashpothi"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <GiOpenBook className="mr-3 text-xl text-primary" /> Jivan Vikash Pothi
        </NavLink>
        <NavLink
          to="/generalknowledge"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaLightbulb className="mr-3 text-xl text-primary" /> General Knowledge
        </NavLink>
        <NavLink
          to="/bhagwadgeeta"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaBookReader className="mr-3 text-xl text-primary" /> Bhagwad Geeta
        </NavLink>
        <NavLink
          to="/banners"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaBookReader className="mr-3 text-xl text-primary" /> Banners
        </NavLink>
        <NavLink
          to="/chapters"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaBookReader className="mr-3 text-xl text-primary" /> Chapters
        </NavLink>
        <NavLink
          to="/youtube"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaBookReader className="mr-3 text-xl text-primary" /> Youtube
        </NavLink>
        <NavLink
          to="/maths"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaBookReader className="mr-3 text-xl text-primary" /> Maths options
        </NavLink>
        <NavLink
          to="/maths-books"
          className={({ isActive }) => `flex items-center p-4 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'}`}
        >
          <FaBookReader className="mr-3 text-xl text-primary" /> Maths Books
        </NavLink>
      </nav>
    </div>
    
  );
};

export default Sidebar;
