
import React from 'react';
import { motion } from 'framer-motion';

const GalaxyBackground: React.FC = () => {
  const stars = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 15 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white opacity-40"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
          }}
        />
      ))}
      
      {/* Added 'i' to the map arguments to provide the index for the alternating background colors below */}
      {particles.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: p.size * 10,
            height: p.size * 10,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, ${i % 2 === 0 ? '#8b5cf6' : '#ec4899'} 0%, transparent 70%)`,
          }}
          animate={{
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`, `${p.x}%`],
            y: [`${p.y}%`, `${p.y + (Math.random() * 10 - 5)}%`, `${p.y}%`],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GalaxyBackground;
