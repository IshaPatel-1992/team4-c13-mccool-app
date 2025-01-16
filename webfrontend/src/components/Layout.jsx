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
      <footer>
        {/* Your footer content */}
        <p>© 2021, Tara McCool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
