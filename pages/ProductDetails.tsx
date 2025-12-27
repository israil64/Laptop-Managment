
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product, ProductCondition } from '../types';
import { ICONS } from '../constants';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImg, setActiveImg] = useState(0);

  // Mock product fetch
  const product: Product = {
    id: '1',
    name: 'MacBook Pro 14" M1 Pro (Refurbished)',
    type: 'Laptop',
    brand: 'Apple',
    model: 'A2442',
    price: 1299,
    discountPrice: 1199,
    stock: 5,
    condition: ProductCondition.LIKE_NEW,
    usedDuration: '4 months',
    batteryHealth: 98,
    damageNotes: 'None. Original protective film still on some ports.',
    warrantyType: 'Store Warranty (6 Months)',
    images: [
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22',
      'https://picsum.photos/800/600?random=23'
    ],
    averageRating: 4.8,
    description: 'Experience the power of M1 Pro. This unit was used in a corporate environment for less than 4 months. It is in pristine condition with 98% battery health. Comes with original charger and box.'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Images */}
        <div className="flex-grow lg:w-1/2">
          <div className="aspect-video rounded-3xl overflow-hidden mb-4 border border-gray-800 bg-gray-900">
            <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  activeImg === i ? 'border-violet-500' : 'border-gray-800'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-2 py-1 bg-violet-500/10 text-violet-400 text-xs font-bold rounded uppercase tracking-widest border border-violet-500/20">
                {product.condition}
              </span>
              <span className="text-gray-500 text-sm">{product.brand} • {product.model}</span>
            </div>
            <h1 className="text-4xl font-space font-bold text-white mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
               <div className="flex text-amber-500">
                 {[1,2,3,4,5].map(s => <ICONS.Star key={s} className="w-5 h-5" />)}
               </div>
               <span className="text-gray-400 text-sm font-medium">4.8 (24 Verified Reviews)</span>
            </div>
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-bold text-white">${product.discountPrice || product.price}</span>
              {product.discountPrice && <span className="text-xl text-gray-500 line-through">${product.price}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-950 border border-gray-800 p-4 rounded-2xl">
              <span className="block text-xs text-gray-500 uppercase mb-1">Battery Health</span>
              <span className="text-xl font-bold text-emerald-400">{product.batteryHealth}%</span>
            </div>
            <div className="bg-gray-950 border border-gray-800 p-4 rounded-2xl">
              <span className="block text-xs text-gray-500 uppercase mb-1">Usage History</span>
              <span className="text-xl font-bold text-gray-200">{product.usedDuration}</span>
            </div>
            <div className="bg-gray-950 border border-gray-800 p-4 rounded-2xl">
              <span className="block text-xs text-gray-500 uppercase mb-1">Warranty</span>
              <span className="text-lg font-bold text-gray-200">{product.warrantyType}</span>
            </div>
            <div className="bg-gray-950 border border-gray-800 p-4 rounded-2xl">
              <span className="block text-xs text-gray-500 uppercase mb-1">Stock Status</span>
              <span className="text-lg font-bold text-gray-200">{product.stock} Units Left</span>
            </div>
          </div>

          <div>
             <h3 className="text-lg font-bold mb-3">Damage & Condition Notes</h3>
             <p className="text-gray-400 text-sm leading-relaxed">{product.damageNotes}</p>
          </div>

          <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row gap-4">
            <button className="flex-grow bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all">
              <ICONS.Cart className="w-5 h-5" />
              <span>Launch into Cart</span>
            </button>
            <button className="px-8 py-4 bg-gray-900 border border-gray-800 hover:border-gray-700 text-white font-bold rounded-2xl">
               Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
