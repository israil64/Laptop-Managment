
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface SignupProps {
  setUser: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: UserRole.USER,
      twoFactorEnabled: false,
      socialProvider: 'email'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    navigate('/dashboard');
  };

  const handleSocialSignup = (provider: string) => {
    const mockUser: User = {
      id: 'social_' + Math.random().toString(36).substr(2, 9),
      name: `NEW_${provider.toUpperCase()}_EXPLORER`,
      email: `${provider}@new.galaxy.com`,
      role: UserRole.USER,
      socialProvider: provider as any
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-space font-bold mb-2 text-white">Join the Galaxy</h1>
          <p className="text-gray-500">Create your commander profile</p>
        </div>

        <div className="space-y-3 mb-8">
          <button 
            onClick={() => handleSocialSignup('google')}
            className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl transition-all"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            <span>Sign up with Google</span>
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-800"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-950 px-2 text-gray-500 font-bold">Or use your email</span></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium"
              placeholder="Neil Armstrong"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium"
              placeholder="commander@galaxy.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Confirm</label>
              <input
                type="password"
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-500/20 mt-6 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
          >
            Launch Profile
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-900 text-center">
          <p className="text-sm text-gray-500">
            Already a Commander? <Link to="/login" className="text-violet-400 font-bold hover:text-violet-300">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
