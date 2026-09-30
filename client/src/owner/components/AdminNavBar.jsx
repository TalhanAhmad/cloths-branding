/**
 * ADMIN NAV BAR COMPONENT
 * Navigation specifically for admin/owner panel
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaUsers,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from 'react-icons/fa';

const AdminNavBar = ({ onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <FaBox />, label: 'Products', path: '/admin/products' },
    { icon: <FaShoppingCart />, label: 'Orders', path: '/admin/orders' },
    { icon: <FaUsers />, label: 'Users', path: '/admin/users' },
    { icon: <FaChartBar />, label: 'Analytics', path: '/admin/analytics' },
  ];

  return (
    <nav className="bg-darkBg text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-gold font-bold text-xl">LUXE ADMIN</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 hover:text-gold transition text-sm font-medium"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-sm"
          >
            <FaSignOutAlt /> Logout
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-700">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 py-2 px-4 hover:bg-gray-800 hover:text-gold transition"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <button
              onClick={onLogout}
              className="w-full text-left flex items-center gap-2 py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg mt-2 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavBar;
