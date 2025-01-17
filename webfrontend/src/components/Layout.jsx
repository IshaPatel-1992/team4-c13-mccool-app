// components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* This is where the page-specific content will be rendered */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
