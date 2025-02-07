import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ContextProvider from './components/ContextProvider';

const Layout = () => {
  return (
    <ContextProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </ContextProvider>
  );
};

export default Layout;
