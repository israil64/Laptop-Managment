
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-xl font-space font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
                LAPTOP GALAXY
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Leading the universe in high-performance second-hand tech. Certified, verified, and delivered across the galaxy.
            </p>
          </div>

          <div>
            <h4 className="font-space font-bold text-white mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/shop" className="hover:text-violet-400">All Laptops</Link></li>
              <li><Link to="/shop" className="hover:text-violet-400">Computer Parts</Link></li>
              <li><Link to="/shop" className="hover:text-violet-400">Featured Builds</Link></li>
              <li><Link to="/inventory" className="hover:text-violet-400">Stock Alerts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-space font-bold text-white mb-6">Commander</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/dashboard" className="hover:text-violet-400">Dashboard</Link></li>
              <li><Link to="/my-orders" className="hover:text-violet-400">Purchase History</Link></li>
              <li><Link to="/wishlist" className="hover:text-violet-400">Wishlist</Link></li>
              <li><Link to="/profile" className="hover:text-violet-400">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-space font-bold text-white mb-6">Mission Control</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Join our cosmic newsletter for tech deals.</p>
              <div className="flex">
                <input type="email" placeholder="Email Address" className="bg-gray-900 border border-gray-800 rounded-l-lg px-4 py-2 text-sm focus:outline-none w-full" />
                <button className="bg-violet-600 px-4 py-2 rounded-r-lg text-white font-bold text-sm">Join</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <p>© 2024 Laptop Galaxy Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
