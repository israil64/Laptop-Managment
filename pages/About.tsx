
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-20"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl font-space font-bold mb-6">Our Mission Control</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          At Laptop Galaxy, we believe premium tech shouldn't cost the earth. We're on a mission to circulate high-performance hardware across the universe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative rounded-3xl overflow-hidden aspect-video border border-gray-800">
           <img src="https://picsum.photos/1200/800?random=101" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Laboratory" />
           <div className="absolute inset-0 bg-violet-600/10" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-space font-bold text-white">The Verification Protocol</h2>
          <p className="text-gray-400 leading-relaxed">
            Every laptop that enters our galaxy undergoes a rigorous 50-point inspection process. From thermal performance stress tests to battery health calibration, we ensure that "second-hand" feels like "first-time."
          </p>
          <ul className="space-y-3">
            {['Hardware Stress Testing', 'Software Optimization', 'Deep Cleaning & Sanitization', 'Battery Cycle Verification'].map((item, i) => (
              <li key={i} className="flex items-center space-x-3 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Sustainability', desc: 'Reducing e-waste by extending the lifecycle of flagship devices.' },
          { title: 'Accessibility', desc: 'Making high-end workstations affordable for students and creators.' },
          { title: 'Reliability', desc: 'Backing every purchase with our cosmic-grade store warranty.' },
        ].map((card, i) => (
          <div key={i} className="p-8 bg-gray-950 border border-gray-800 rounded-2xl hover:border-violet-500/50 transition-all">
             <h3 className="text-xl font-bold mb-4 text-violet-400">{card.title}</h3>
             <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
