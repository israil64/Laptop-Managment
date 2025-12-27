
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../constants';

const DEFAULT_REVIEWS = [
  { id: '1', name: 'Sarah J.', rating: 5, comment: 'Pristine condition MacBook. Detailed testing.', userName: 'Sarah J.', date: 'Oct 12' },
  { id: '2', name: 'Marcus T.', rating: 4, comment: 'Fast shipping, works perfectly.', userName: 'Marcus T.', date: 'Oct 08' }
];

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      localStorage.setItem('reviews', JSON.stringify(DEFAULT_REVIEWS));
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-space font-bold mb-4">Citizen Feedback</h1>
        <p className="text-gray-400">Moderated community thoughts on their cosmic gear.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <motion.div key={rev.id} whileHover={{ y: -5 }} className="p-8 bg-gray-950 border border-gray-800 rounded-3xl">
            <div className="flex text-amber-500 mb-4">{'★'.repeat(rev.rating)}</div>
            <p className="text-gray-300 italic mb-6">"{rev.comment}"</p>
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500">
               <span className="text-white">{rev.userName}</span>
               <span>{rev.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reviews;
