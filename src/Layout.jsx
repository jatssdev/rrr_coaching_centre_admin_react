import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ContextProvider from './components/ContextProvider';
import PdfViewer from './components/PdfViewer';

const Layout = () => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  // const pdfUrl = "https://rrr.jatssdev.com/pdf_book/1-English.PDF"; // Replace with your PDF URL

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
