
# 🌌 Laptop Galaxy - Deployment Guide

Professional e-commerce platform for high-end refurbished technology.

## 🚀 One-Click Push to GitHub
If you haven't uploaded yet, run these commands in your project root:

```bash
git init
git add .
git commit -m "Production Release: High-Fidelity Marketplace"
git remote add origin https://github.com/israil64/Laptop-Managment.git
git branch -M main
git push -u origin main
```

## 🛠️ Backend Setup (Render.com)
1. **New Web Service** linked to your GitHub repo.
2. **Settings**:
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
3. **Environment Variables**:
   - `MONGODB_URI`: `mongodb+srv://israilsara786_db_user:IuVBDUnfmS5Gl3Z9@cluster0.uraur2q.mongodb.net/?appName=Cluster0`
   - `JWT_SECRET`: `galaxy_super_secret_key_123`
   - `PORT`: `5000`

## 🌐 Frontend Setup (Netlify / Vercel)
1. **Import from GitHub** > Select `Laptop-Managment`.
2. **Build Settings**:
   - Command: `npm run build`
   - Directory: `dist`
3. **Environment Variables**:
   - `VITE_API_URL`: Your Render service URL (e.g., `https://laptop-api.onrender.com/api`)

---
*Verified Production Standards - Database Connectivity Active.*
