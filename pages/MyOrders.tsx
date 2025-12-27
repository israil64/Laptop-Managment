
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';

interface MyOrdersProps {
  user: User | null;
}

const MyOrders: React.FC<MyOrdersProps> = ({ user }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-space font-bold text-white">Purchase History</h1>
          <p className="text-gray-500">View and manage your previous tech acquisitions.</p>
        </div>
      </div>
      
      <div className="bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-900/30">
          <div>
            <h2 className="text-lg font-bold text-violet-400">Order #G-1029</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Confirmed • Oct 24, 2023</p>
          </div>
          <button className="px-5 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
            Get Invoice
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
              <img src="https://picsum.photos/200/200?random=1" className="w-full h-full object-cover" alt="Product" />
            </div>
            <div>
              <h3 className="font-bold text-gray-100">MacBook Pro 14" M1 Pro</h3>
              <p className="text-sm text-gray-500">Quantity: 1 • Space Gray</p>
            </div>
            <div className="ml-auto text-right">
              <span className="block font-bold text-white">$1,299</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">Paid</span>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-800">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping Destination</span>
              <span className="text-gray-300 font-medium">Starbase 1, Nebula Sector</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className="text-gray-300 font-medium">Cosmic Credit Card (**** 4421)</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-4">
              <span className="text-white">Total Amount</span>
              <span className="text-violet-400">$1,299.00</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600">Looking for older orders? <button className="text-violet-500 font-bold">Contact Mission Support</button></p>
      </div>
    </motion.div>
  );
};

export default MyOrders;
