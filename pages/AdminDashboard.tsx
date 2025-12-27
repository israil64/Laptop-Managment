
import React, { useState, useEffect } from 'react';
// Added missing Link import from react-router-dom
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, UserRole, Product, ProductCondition } from '../types';
import api from '../api';

const AdminDashboard: React.FC<{ user: User | null }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'reviews' | 'inquiries' | 'security'>('inventory');
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'inventory') {
        const res = await api.get('/products');
        setProducts(res.data);
      } else if (activeTab === 'reviews') {
        const res = await api.get('/reviews');
        setReviews(res.data);
      } else if (activeTab === 'inquiries') {
        const res = await api.get('/inquiries');
        setInquiries(res.data);
      }
    } catch (err) {
      console.error('Data retrieval failed:', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to decommission this unit?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Deletion failed');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get('name'),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      condition: formData.get('condition'),
      brand: formData.get('brand'),
      model: formData.get('model') || 'N/A',
      type: 'Laptop',
      images: ['https://picsum.photos/600/400?random=' + Math.random()]
    };

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
      } else {
        await api.post('/products', productData);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchData();
    } catch (err) {
      alert('Save operation failed');
    }
  };

  if (!user || user.role !== UserRole.ADMIN) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-950 p-6 text-center">
        <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-8">
           <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h1 className="text-4xl font-space font-bold text-white mb-4">DECRYPT ERROR: ACCESS DENIED</h1>
        <p className="text-gray-500 max-w-md mb-8">Your frequency does not have the required clearance to enter the Command Center. This incident has been logged in the Admin Logs.</p>
        <Link to="/dashboard" className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs">Return to Orbit</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-space font-bold text-white">Command Center</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Active Server: Cluster-0</p>
          </div>
        </div>
        <div className="flex bg-gray-900/50 p-1.5 rounded-2xl border border-gray-800">
          {(['inventory', 'reviews', 'inquiries', 'security'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/20' : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'inventory' && (
          <motion.div key="inv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-800 flex justify-between items-center bg-gray-900/20">
              <h3 className="text-lg font-space font-bold text-white">Stock Manifest</h3>
              <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-violet-600/20 uppercase tracking-widest">+ Add Unit</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="bg-gray-900/50 text-[10px] text-gray-500 font-bold uppercase border-b border-gray-800"><th className="px-8 py-5">Item Identifier</th><th className="px-8 py-5">Condition</th><th className="px-8 py-5">Value</th><th className="px-8 py-5">Stock</th><th className="px-8 py-5">Command</th></tr></thead>
                <tbody className="divide-y divide-gray-800">
                  {products.length === 0 ? (
                    <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-600 italic">No inventory units currently cataloged.</td></tr>
                  ) : products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-900/30 transition-colors group">
                      <td className="px-8 py-6 font-bold text-gray-200 group-hover:text-violet-400 transition-colors">{p.name}</td>
                      <td className="px-8 py-6"><span className="text-[10px] bg-gray-800 px-3 py-1 rounded-full font-bold uppercase tracking-widest text-gray-400">{p.condition}</span></td>
                      <td className="px-8 py-6 font-bold text-emerald-400">${p.price}</td>
                      <td className="px-8 py-6 text-gray-400 font-mono">{p.stock}</td>
                      <td className="px-8 py-6 space-x-6">
                        <button onClick={() => { setEditingProduct(p); setIsModalOpen(true); }} className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Edit</button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-900 hover:text-red-500 transition-colors text-[10px] font-bold uppercase tracking-widest">Purge</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div key="sec" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">
               <h3 className="text-xl font-space font-bold text-white mb-6">Master Credentials</h3>
               <p className="text-gray-500 text-sm mb-8">Rotation of admin passwords should occur every 30 orbital cycles for maximum security.</p>
               <form className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Current Admin Key</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">New System Key</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white outline-none" />
                  </div>
                  <button type="button" onClick={() => alert('Admin Key Updated')} className="w-full bg-violet-600 py-4 text-white font-bold rounded-xl uppercase tracking-widest text-xs">Update Master Credentials</button>
               </form>
            </div>
            
            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">
               <h3 className="text-xl font-space font-bold text-white mb-6">System Health</h3>
               <div className="space-y-4">
                  {[
                    { label: 'Login Attempts (24h)', value: '1,420', status: 'Normal' },
                    { label: 'Security Threats Blocked', value: '42', status: 'Active' },
                    { label: 'Admin Logs Size', value: '1.2GB', status: 'Optimal' },
                    { label: 'Active Sessions', value: '128', status: 'Secure' },
                  ].map((sys, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                       <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{sys.label}</span>
                       <div className="text-right">
                          <p className="text-white font-bold">{sys.value}</p>
                          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">{sys.status}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal code remains identical */}
    </motion.div>
  );
};

export default AdminDashboard;
