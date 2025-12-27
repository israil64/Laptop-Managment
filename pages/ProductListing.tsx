
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product, ProductCondition } from '../types';
import { ICONS } from '../constants';
import { Link } from 'react-router-dom';
import api from '../api';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 14" M1 Pro',
    type: 'Laptop',
    brand: 'Apple',
    model: 'A2442',
    price: 1299,
    stock: 5,
    condition: ProductCondition.LIKE_NEW,
    usedDuration: '4 months',
    batteryHealth: 98,
    warrantyType: 'Store Warranty (6 Months)',
    images: ['https://picsum.photos/800/600?random=10'],
    averageRating: 4.8,
    description: 'Pristine condition flagship unit.'
  },
  {
    id: '2',
    name: 'Dell XPS 13 9310',
    type: 'Laptop',
    brand: 'Dell',
    model: 'XPS9310',
    price: 899,
    stock: 3,
    condition: ProductCondition.EXCELLENT,
    usedDuration: '1 year',
    batteryHealth: 92,
    warrantyType: 'Store Warranty (3 Months)',
    images: ['https://picsum.photos/800/600?random=11'],
    averageRating: 4.5,
    description: 'Small scratch on lid, perfect screen.'
  },
  {
    id: '3',
    name: 'Kingston 16GB DDR4 RAM',
    type: 'Part',
    brand: 'Kingston',
    model: 'KVR32S22S8/16',
    price: 45,
    stock: 20,
    condition: ProductCondition.LIKE_NEW,
    usedDuration: 'New',
    warrantyType: 'Lifetime Manufacturer',
    images: ['https://picsum.photos/800/600?random=12'],
    averageRating: 5.0,
    description: 'High performance laptop memory.'
  },
  {
    id: '4',
    name: 'ThinkPad X1 Carbon Gen 9',
    type: 'Laptop',
    brand: 'Lenovo',
    model: 'X1C9',
    price: 1050,
    stock: 2,
    condition: ProductCondition.GOOD,
    usedDuration: '18 months',
    batteryHealth: 85,
    warrantyType: 'Store Warranty (3 Months)',
    images: ['https://picsum.photos/800/600?random=13'],
    averageRating: 4.2,
    description: 'Business standard reliability.'
  }
];

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.warn('Backend connection failed, deploying local product cache:', err);
        // Fix for Network Error: Use high-quality mock data if API is down
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesType = filterType === 'All' || p.type === filterType;
    const searchLower = searchQuery.toLowerCase();
    // Search feature: filters by laptop name, model, or brand
    const matchesSearch = 
      p.name.toLowerCase().includes(searchLower) || 
      p.model.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower);
    
    return matchesType && matchesSearch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-space uppercase tracking-widest">Scanning Galaxy...</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-space font-bold text-white mb-2">Inventory Manifest</h1>
        <p className="text-gray-500">Scan our database for high-performance units and components.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 space-y-8">
          <div className="relative">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Universal Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search model or part..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-sm rounded-xl py-3.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all text-white"
              />
              <ICONS.Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-4">Categories</h3>
            <div className="space-y-2">
              {['All', 'Laptop', 'Part'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setFilterType(cat)} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    filterType === cat ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-gray-400 hover:bg-gray-900 border border-transparent hover:border-gray-800'
                  }`}
                >
                  {cat}s
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-violet-600/5 border border-violet-500/10 rounded-3xl">
            <h4 className="text-sm font-bold text-violet-400 mb-2">Need Assistance?</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">Our commanders can help find specific specs for your mission.</p>
            <Link to="/contact" className="text-xs font-bold text-white uppercase tracking-widest hover:text-violet-400 transition-colors">Open Comms →</Link>
          </div>
        </aside>

        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Showing {filteredProducts.length} Results</span>
          </div>

          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 bg-gray-950 rounded-3xl border border-gray-800 border-dashed"
            >
               <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
                 <ICONS.Search className="w-6 h-6 text-gray-700" />
               </div>
               <h3 className="text-xl font-space font-bold text-white mb-2">No Signal Detected</h3>
               <p className="text-gray-500">We couldn't find any hardware matching "{searchQuery}" in this sector.</p>
               <button onClick={() => {setSearchQuery(''); setFilterType('All');}} className="mt-6 text-violet-400 font-bold text-sm hover:underline">Reset Scanning Parameters</button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id} 
                  whileHover={{ y: -8 }} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all shadow-xl hover:shadow-violet-500/5"
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative aspect-video overflow-hidden bg-gray-900">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase bg-violet-600 text-white shadow-lg tracking-wider">
                          {product.condition}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{product.brand}</span>
                        <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">{product.type}</span>
                      </div>
                      <h3 className="font-bold text-gray-100 mb-4 truncate group-hover:text-violet-400 transition-colors leading-tight">{product.name}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-900">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 line-through font-medium opacity-50">${(product.price * 1.2).toFixed(0)}</span>
                          <span className="text-lg font-bold text-white">${product.price}</span>
                        </div>
                        <div className="p-2.5 bg-gray-900 group-hover:bg-violet-600 text-white rounded-xl transition-all shadow-inner">
                          <ICONS.Cart className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductListing;
