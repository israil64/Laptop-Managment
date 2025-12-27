# 🌌 Laptop Galaxy - Deployment Guide

Professional e-commerce platform for high-end refurbished technology.

## 🚀 Step 1: Push code to GitHub
1. Create a **New Repository** on GitHub named `Laptop-Management`.
2. Open your terminal in this project folder and run:

```bash
git init
git add .
git commit -m "Production Release"
git branch -M main
git remote add origin https://github.com/israil64/Laptop-Management.git
git push -u origin main
```

## 🛠️ Step 2: Deploy Backend (Render.com)
1. In Render, click **New +** > **Web Service**.
2. If your repo is Public, paste `https://github.com/israil64/Laptop-Management` in the Public tab.
3. If Private, use the **Git Provider** tab and select your repo.
4. **Configuration**:
   - **Name**: `laptop-galaxy-api`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables** (Advanced):
   - `MONGODB_URI`: `mongodb+srv://israilsara786_db_user:IuVBDUnfmS5Gl3Z9@cluster0.uraur2q.mongodb.net/?appName=Cluster0`
   - `JWT_SECRET`: `galaxy_super_secret_key_99`

## 🌐 Step 3: Deploy Frontend (Netlify/Vercel)
1. Connect your GitHub to Netlify.
2. Select the `Laptop-Management` repo.
3. **Build settings**:
   - Build Command: `npm run build`
   - Publish directory: `dist`
4. **Env Var**:
   - `VITE_API_URL`: Your Render URL (e.g., `https://laptop-galaxy-api.onrender.com/api`)
