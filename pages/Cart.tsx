
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const Cart: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'MacBook Pro 14" M1 Pro',
      price: 1199,
      quantity: 1,
      image: 'https://picsum.photos/200/200?random=51'
    },
    {
      id: '4',
      name: 'Kingston 16GB DDR4 RAM',
      price: 45,
      quantity: 2,
      image: 'https://picsum.photos/200/200?random=52'
    }
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-800">
          <ICONS.Cart className="w-10 h-10 text-gray-700" />
        </div>
        <h1 className="text-2xl font-space font-bold mb-4">Your Cargo Bay is Empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-sm">Looks like you haven't added any tech to your ship. Head back to the shop to find your gear.</p>
        <Link to="/shop" className="px-8 py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all">
          Explore Inventory
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-space font-bold mb-12">Your Cargo Bay</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="bg-gray-950 border border-gray-800 rounded-2xl p-6 flex items-center gap-6"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-800">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-violet-400 font-bold">${item.price}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-900 rounded-lg p-1">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">-</button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">+</button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="lg:w-96">
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 sticky top-24">
            <h2 className="text-xl font-space font-bold mb-6">Mission Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Space Tax (8%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Warp Shipping</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="h-px bg-gray-800 my-4" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-violet-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-500/20 transition-all">
              Proceed to Checkout
            </Link>
            
            <p className="mt-6 text-center text-xs text-gray-500">Secure encrypted galaxy-level checkout.</p>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default Cart;
