
import axios from 'https://esm.sh/axios@^1.7.9';

// In production, set VITE_API_URL in your deployment platform (e.g., Netlify/Vercel)
// to your Render.com backend URL.
const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT token for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global errors like 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Potentially redirect to login or clear stale tokens
      console.warn('Session expired or unauthorized access.');
    }
    return Promise.reject(error);
  }
);

export default api;
