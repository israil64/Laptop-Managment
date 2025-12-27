
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

## 🛠️ Step 2: Alternative Free Backend Hosting

### Option A: Koyeb (Fastest)
1. Login to [Koyeb.com](https://app.koyeb.com/).
2. Create Service -> GitHub -> Select `Laptop-Management`.
3. Set **Build Type** to `Buildpacks`.
4. Add Env Vars: `MONGODB_URI`, `JWT_SECRET`.
5. Set `PORT` to `8000`.

### Option B: Adaptable.io
1. Login to [Adaptable.io](https://adaptable.io/).
2. Connect GitHub and select your repo.
3. Select **Node.js App** type.
4. It will auto-detect `server.ts`. Add your Environment Variables in the settings.

## 🌐 Step 3: Deploy Frontend (Netlify/Vercel)
1. Connect your GitHub to Netlify.
2. Select the `Laptop-Management` repo.
3. **Build settings**:
   - Build Command: `npm run build`
   - Publish directory: `dist`
4. **Env Var**:
   - `VITE_API_URL`: Your new Backend URL (e.g., `https://your-app.koyeb.app/api`)
