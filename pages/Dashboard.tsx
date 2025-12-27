
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';
import { Link } from 'react-router-dom';

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<'overview' | 'security'>('overview');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [twoFactor, setTwoFactor] = useState(user?.twoFactorEnabled || false);

  if (!user) return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="text-2xl font-space font-bold">Access Restricted</h1>
        <Link to="/login" className="px-6 py-3 bg-violet-600 text-white rounded-xl">Login to Continue</Link>
    </div>
  );

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Galactic credentials updated successfully.');
    setCurrentPass('');
    setNewPass('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 p-1">
            <div className="w-full h-full rounded-[14px] bg-gray-900 flex items-center justify-center overflow-hidden border border-gray-800">
               <span className="text-3xl font-bold text-white">{user.name[0]}</span>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-space font-bold mb-2 text-white">Welcome, {user.name.split(' ')[0]}</h1>
            <p className="text-gray-500">Managing mission parameters for {user.email}</p>
          </div>
        </div>
        <div className="flex bg-gray-900/50 p-1 rounded-xl border border-gray-800">
           <button onClick={() => setActiveView('overview')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeView === 'overview' ? 'bg-violet-600 text-white' : 'text-gray-500'}`}>Overview</button>
           <button onClick={() => setActiveView('security')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeView === 'security' ? 'bg-violet-600 text-white' : 'text-gray-500'}`}>Security</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'overview' ? (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { label: 'Completed Orders', value: '2', icon: '🛒', color: 'blue' },
                { label: 'Wishlist Items', value: '12', icon: '✨', color: 'pink' },
                { label: 'Review Points', value: '450', icon: '🏆', color: 'amber' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-950 border border-gray-800 rounded-3xl p-8 hover:border-gray-700 transition-all">
                  <div className="text-2xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold mb-1 text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-900/20">
                <h2 className="text-xl font-space font-bold text-white">Recent Acquisitions</h2>
                <Link to="/my-orders" className="text-violet-400 text-sm font-bold hover:text-violet-300 transition-colors uppercase tracking-widest">History →</Link>
              </div>
              <div className="divide-y divide-gray-800">
                {[
                  { id: '#G-1029', date: '2 days ago', total: '$1,299', status: 'Delivered' },
                  { id: '#G-1011', date: 'Oct 15, 2023', total: '$45', status: 'Delivered' },
                ].map((order) => (
                  <div key={order.id} className="p-8 flex items-center justify-between hover:bg-gray-900/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">#</div>
                      <div>
                        <div className="font-bold text-gray-100">{order.id}</div>
                        <div className="text-xs text-gray-500">{order.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white mb-1">{order.total}</div>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Processed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">
               <h3 className="text-xl font-space font-bold text-white mb-6">Password Modulation</h3>
               <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Current Password</label>
                    <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">New Galactic Password</label>
                    <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none" />
                  </div>
                  <button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-violet-600/20">Update Credentials</button>
               </form>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">
               <h3 className="text-xl font-space font-bold text-white mb-2">Two-Factor Shield</h3>
               <p className="text-gray-500 text-sm mb-8">Add an extra layer of protection to your account with a secondary verification signal.</p>
               <div className="flex items-center justify-between p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <div>
                    <p className="font-bold text-white">Multi-Device 2FA</p>
                    <p className="text-xs text-gray-500">Verification code via Cosmic Email or App</p>
                  </div>
                  <button 
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative w-14 h-8 rounded-full transition-all ${twoFactor ? 'bg-violet-600' : 'bg-gray-800'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${twoFactor ? 'left-7' : 'left-1'}`} />
                  </button>
               </div>
               {twoFactor && (
                 <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      Shield is Active
                    </p>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
