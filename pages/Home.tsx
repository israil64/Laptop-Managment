
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GalaxyBackground from '../components/GalaxyBackground';
import { ICONS } from '../constants';

const Home: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-4">
        <GalaxyBackground />
        
        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold tracking-widest uppercase mb-6">
              Second-Hand, First-Class
            </span>
            <h1 className="text-5xl md:text-7xl font-space font-bold mb-8 leading-tight">
              Evolve Your Tech with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400">
                Laptop Galaxy
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore our curated selection of pre-owned flagship laptops and high-performance parts. 
              Verified condition, extended warranty, and galaxy-speed delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop" className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/20">
                Explore Inventory
              </Link>
              <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-gray-900 border border-gray-800 hover:border-gray-700 text-white font-bold rounded-xl transition-all">
                Our Verification Process
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Laptops', value: '1,200+' },
            { label: 'Happy Users', value: '45k+' },
            { label: 'Trust Rating', value: '4.9/5' },
            { label: 'Components', value: '8,000+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-space font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-space font-bold text-white mb-4">Cosmic Collections</h2>
            <p className="text-gray-400">Hand-picked gear for creators, coders, and gamers.</p>
          </div>
          <Link to="/shop" className="text-violet-400 hover:text-violet-300 font-medium">View all products →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              name: 'Gaming Rigs', 
              image: 'https://picsum.photos/800/600?random=1',
              count: '320+ Units',
              desc: 'RTX-powered monsters'
            },
            { 
              name: 'Workstations', 
              image: 'https://picsum.photos/800/600?random=2',
              count: '150+ Units',
              desc: 'ThinkPads & MacBooks'
            },
            { 
              name: 'Core Components', 
              image: 'https://picsum.photos/800/600?random=3',
              count: '2.5k+ Items',
              desc: 'RAM, SSDs & Panels'
            },
          ].map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={cat.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-violet-400 text-xs font-bold mb-2 block">{cat.count}</span>
                <h3 className="text-2xl font-space font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-gray-400 text-sm">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
