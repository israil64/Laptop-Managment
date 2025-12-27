
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation: Admin check & User mapping
    const role = email.includes('admin') ? UserRole.ADMIN : UserRole.USER;
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: role,
      twoFactorEnabled: email.includes('secure'), // Mock 2FA for specific emails
      socialProvider: 'email'
    };

    if (mockUser.twoFactorEnabled) {
      setPendingUser(mockUser);
      setShow2FA(true);
    } else {
      completeAuth(mockUser);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    // Simulated Social OAuth
    const mockUser: User = {
      id: 'social_' + Math.random().toString(36).substr(2, 9),
      name: `GALAXY_${provider.toUpperCase()}_USER`,
      email: `${provider}@galaxy.com`,
      role: UserRole.USER,
      twoFactorEnabled: false,
      socialProvider: provider,
      avatar: provider === 'google' ? 'https://www.google.com/favicon.ico' : undefined
    };
    completeAuth(mockUser);
  };

  const completeAuth = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    navigate(user.role === UserRole.ADMIN ? '/admin' : '/dashboard');
  };

  const verify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFactorCode === '123456' && pendingUser) {
      completeAuth(pendingUser);
    } else {
      alert('Invalid Verification Code');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {!show2FA ? (
          <motion.div 
            key="login-form"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-space font-bold mb-2 text-white">Access Terminal</h1>
              <p className="text-gray-500">Decrypt your session credentials</p>
            </div>

            <div className="space-y-4 mb-8">
              <button 
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl transition-all shadow-lg"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                <span>Continue with Google</span>
              </button>
              <button 
                onClick={() => handleSocialLogin('github')}
                className="w-full flex items-center justify-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl border border-gray-700 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-800"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-950 px-2 text-gray-500 font-bold tracking-widest">Or Secure Login</span></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium"
                  placeholder="commander@galaxy.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 text-gray-500 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-700 bg-gray-900 text-violet-600 focus:ring-0" />
                  <span>Stay Logged In</span>
                </label>
                <a href="#" className="text-violet-400 font-bold hover:text-violet-300">Recover Password</a>
              </div>

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
              >
                Authenticate Session
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-900 text-center">
              <p className="text-sm text-gray-500">
                New Unit? <Link to="/signup" className="text-violet-400 font-bold hover:text-violet-300">Register Frequency</Link>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="2fa-terminal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-10 shadow-3xl text-center"
          >
            <div className="w-20 h-20 bg-violet-600/10 border border-violet-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-space font-bold text-white mb-2">2FA Verification</h2>
            <p className="text-gray-500 text-sm mb-8">Enter the 6-digit galactic key sent to your secure device.</p>
            
            <form onSubmit={verify2FA} className="space-y-6">
              <input 
                type="text" 
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder="000000"
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5 text-3xl font-mono text-center tracking-[1rem] text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <button 
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-violet-500/20 transition-all uppercase tracking-widest text-xs"
              >
                Verify & Grant Access
              </button>
              <button 
                type="button"
                onClick={() => setShow2FA(false)}
                className="text-xs text-gray-500 font-bold hover:text-white uppercase tracking-widest"
              >
                Return to Login
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
