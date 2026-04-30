# Deployment Guide

## Overview
This project has two components:
- **Frontend**: React application (deployed on Vercel)
- **Backend**: FastAPI server (deploy separately)

## Frontend Deployment on Vercel

### Prerequisites
1. GitHub account with your repository pushed
2. Vercel account (vercel.com)

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select "My-Portfolio" repo

3. **Configure Project Settings**
   - **Framework Preset**: React
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `cd frontend && npm install`
   - **Root Directory**: `.` (leave as is)

4. **Set Environment Variables**
   In the Vercel dashboard, add under "Environment Variables":
   - **REACT_APP_API_URL**: Your backend API URL (see Backend Deployment section)

5. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete

## Backend Deployment

### Important: Vercel Limitation
Vercel has limited support for Python. The FastAPI backend **cannot** be deployed directly on Vercel. Choose one of these options:

### Option 1: Railway (Recommended)
1. Go to https://railway.app
2. Create a new project
3. Select "Deploy from GitHub"
4. Choose your repository
5. Set the root directory to `backend`
6. Add environment variables:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: Your database name
7. Railway will automatically detect `requirements.txt` and deploy

### Option 2: Render
1. Go to https://render.com
2. Create a new "Web Service"
3. Select your GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Add environment variables

### Option 3: Heroku
1. Install Heroku CLI
2. Run: `heroku create your-app-name`
3. Set environment variables
4. Push to Heroku: `git push heroku main`

## Environment Setup

### Frontend (.env or .env.local)
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (.env)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=portfolio
```

## Database Setup

### MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Use this as `MONGO_URL`

## Post-Deployment

1. **Test the connection**
   - Frontend should load at your Vercel URL
   - API calls should reach your backend

2. **Update frontend API calls**
   - Ensure all axios calls use `REACT_APP_API_URL` environment variable

3. **Monitor logs**
   - Vercel: Check Deployments > Logs
   - Backend: Check your hosting platform's logs

## Troubleshooting

### Frontend builds but doesn't load
- Check that build output is in `frontend/build`
- Verify all dependencies are in `frontend/package.json`

### API calls fail
- Check CORS settings in backend `server.py`
- Verify `REACT_APP_API_URL` is correct in Vercel environment
- Check backend is running and accessible

### Backend deployment fails
- Ensure `requirements.txt` is in the backend root
- Check MongoDB connection string is valid
- Verify Python version compatibility (3.9+)

## Next Steps
1. Deploy frontend to Vercel first (easier to debug)
2. Deploy backend to your chosen platform
3. Get backend URL
4. Update `REACT_APP_API_URL` in Vercel environment variables
5. Redeploy frontend
