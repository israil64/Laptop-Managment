
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newInquiry = {
      id: Date.now(),
      name: formData.get('name'),
      email: formData.get('email'),
      type: formData.get('type'),
      message: formData.get('message'),
      date: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('inquiries') || '[]');
    localStorage.setItem('inquiries', JSON.stringify([...existing, newInquiry]));
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    e.currentTarget.reset();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-space font-bold mb-8">Signal Transmitter</h1>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">Need help with a technical spec or inventory availability? Send a signal and our mission commanders will respond within 24 standard earth hours.</p>
          <div className="space-y-8">
            <div className="flex items-center space-x-6 group"><div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:border-violet-500 transition-all"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-violet-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg></div><div><p className="text-xs text-gray-500 uppercase font-bold mb-1">Email Terminal</p><p className="text-white font-medium">support@laptopgalaxy.com</p></div></div>
            <div className="flex items-center space-x-6 group"><div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:border-violet-500 transition-all"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-violet-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg></div><div><p className="text-xs text-gray-500 uppercase font-bold mb-1">Starbase HQ</p><p className="text-white font-medium">123 Nebula Way, Silicon Valley, CA</p></div></div>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-10 relative overflow-hidden">
          <AnimatePresence>
            {submitted && (
              <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-violet-600 flex flex-col items-center justify-center z-10 p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl font-space font-bold text-white mb-2">Signal Transmitted</h2>
                <p className="text-violet-100">Our commanders have received your frequency.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-500 mb-2">Identifier</label><input name="name" type="text" required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-violet-500 outline-none" placeholder="Name" /></div>
              <div><label className="block text-sm font-medium text-gray-500 mb-2">Comms Channel</label><input name="email" type="email" required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-violet-500 outline-none" placeholder="Email" /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Frequency</label>
              <select name="type" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-violet-500 outline-none appearance-none">
                <option value="General">General Inquiry</option>
                <option value="Technical">Technical Support</option>
                <option value="Bulk">Bulk Order Signal</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-gray-500 mb-2">Message Payload</label><textarea name="message" rows={5} required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-violet-500 outline-none" placeholder="Your message..."></textarea></div>
            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-500/20 transition-all">Transmit Signal</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
