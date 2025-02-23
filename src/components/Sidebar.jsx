import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaCogs, FaBook, FaClipboardList, FaFlask, FaLightbulb, FaBookReader, FaCloudUploadAlt, FaYoutube
} from 'react-icons/fa';
import { GiOpenBook, GiBookmarklet } from 'react-icons/gi';
import { MdOutlineMenuBook, MdOutlineLibraryBooks } from 'react-icons/md';

const menuItems = [
  { path: "/", label: "Dashboard", icon: FaTachometerAlt },
  { path: "/options", label: "Options", icon: FaCogs },
  { path: "/standards", label: "Standards", icon: FaClipboardList },
  { path: "/books", label: "Books", icon: MdOutlineMenuBook },
  { path: "/scientists", label: "Scientists", icon: FaFlask },
  { path: "/jivvikashpothi", label: "Jivan Vikash Pothi", icon: GiOpenBook },
  { path: "/generalknowledge", label: "General Knowledge", icon: FaLightbulb },
  { path: "/bhagwadgeeta", label: "Bhagwad Geeta", icon: FaBookReader },
  { path: "/banners", label: "Banners", icon: MdOutlineLibraryBooks },
  { path: "/chapters", label: "Chapters", icon: GiBookmarklet },
  { path: "/youtube", label: "Youtube", icon: FaYoutube },
  { path: "/maths", label: "Maths Options", icon: FaBook },
  { path: "/maths-books", label: "Maths Books", icon: MdOutlineLibraryBooks },
  { path: "/upload", label: "Upload Files", icon: FaCloudUploadAlt },
];

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white flex flex-col p-6 border-r border-gray-200">
      <h2 className="text-3xl font-extrabold text-primary text-center mb-8">Rahul Raval</h2>
      <nav className="flex flex-col space-y-4">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center p-4 rounded-lg transition-all ${
                isActive ? 'bg-primary text-white' : 'hover:bg-blue-100 text-gray-700'
              }`
            }
          >
            <Icon className={`mr-3 text-xl ${isActive ? 'text-white' : 'text-primary'}`} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
