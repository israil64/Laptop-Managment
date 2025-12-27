
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface CheckoutProps {
  user: User | null;
}

const Checkout: React.FC<CheckoutProps> = ({ user }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    navigate('/my-orders');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-space font-bold mb-8">Launch Terminal</h1>
          
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-violet-400 uppercase tracking-widest">1. Shipping Logistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" required className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-violet-500" />
                <input type="text" placeholder="Last Name" required className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-violet-500" />
              </div>
              <input type="text" placeholder="Starbase Address" required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-violet-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City / Colony" required className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-violet-500" />
                <input type="text" placeholder="Zip / Portal Code" required className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-violet-500" />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-violet-400 uppercase tracking-widest">2. Payment Frequency</h2>
              <div className="grid grid-cols-1 gap-4">
                <label className="flex items-center p-4 bg-gray-950 border border-gray-800 rounded-xl cursor-pointer hover:border-violet-500 transition-colors">
                  <input type="radio" name="payment" className="w-4 h-4 text-violet-600 bg-gray-900 border-gray-700" defaultChecked />
                  <span className="ml-4 flex-grow">Cosmic Credit Card</span>
                  <div className="flex space-x-2">
                     <div className="w-8 h-5 bg-gray-800 rounded"></div>
                     <div className="w-8 h-5 bg-gray-800 rounded"></div>
                  </div>
                </label>
                <label className="flex items-center p-4 bg-gray-950 border border-gray-800 rounded-xl cursor-pointer hover:border-violet-500 transition-colors">
                  <input type="radio" name="payment" className="w-4 h-4 text-violet-600 bg-gray-900 border-gray-700" />
                  <span className="ml-4">Stellar PayPal</span>
                </label>
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.01]"
            >
              Initiate Transaction
            </button>
          </form>
        </div>

        <aside className="lg:pl-12">
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 sticky top-24">
            <h2 className="text-xl font-space font-bold mb-6">Manifest Summary</h2>
            <div className="space-y-4 mb-6">
               <div className="flex gap-4">
                 <div className="w-16 h-16 bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                    <img src="https://picsum.photos/100/100?random=1" alt="" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-grow">
                   <p className="font-bold text-sm">MacBook Pro 14" M1 Pro</p>
                   <p className="text-xs text-gray-500">Qty: 1</p>
                 </div>
                 <span className="font-bold text-sm">$1,199</span>
               </div>
            </div>

            <div className="h-px bg-gray-800 my-6" />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>$1,199.00</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 text-white">
                <span>Total Due</span>
                <span className="text-violet-400">$1,199.00</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default Checkout;
