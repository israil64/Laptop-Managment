
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS } from '../constants';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/shop' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 shrink-0 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-lg font-space font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400 tracking-tight">
              LAPTOP GALAXY
            </span>
          </Link>

          {/* Desktop Navigation Links (Visible on Tablet & Up) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 px-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-semibold transition-all hover:text-violet-400 relative py-1 ${
                  location.pathname === link.path ? 'text-violet-400' : 'text-gray-400'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action Bar */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-44 bg-gray-900 border border-gray-800 text-xs rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
              />
              <ICONS.Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-500" />
            </div>

            <Link to="/cart" className="relative p-2 group bg-gray-900 rounded-xl border border-gray-800 hover:border-violet-500/50 transition-all">
              <ICONS.Cart className="w-5 h-5 text-gray-300 group-hover:text-violet-400 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-violet-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full border border-gray-950">
                2
              </span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to={user.role === UserRole.ADMIN ? "/admin" : "/dashboard"} 
                  className="group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center overflow-hidden group-hover:border-violet-500 transition-all">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <ICONS.User className="w-5 h-5 text-gray-400 group-hover:text-violet-400" />
                    )}
                  </div>
                </Link>
                <button 
                  onClick={onLogout}
                  className="hidden sm:block text-xs font-bold text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                >
                  Exit
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-xs sm:text-sm font-bold px-4 sm:px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-all shadow-lg shadow-violet-500/30 whitespace-nowrap"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-950 border-t border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-space font-bold ${
                    location.pathname === link.path ? 'text-violet-400' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <button 
                  onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  className="block w-full text-left text-lg font-space font-bold text-red-500 pt-4 border-t border-gray-900"
                >
                  Log Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
