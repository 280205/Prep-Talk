# 🚀 Deploy PrepTalk.Me on Render# 🚀 Deploy PrepTalk.Me on Render - Step by Step Guide# 🚀 Deployment Guide for PrepTalk.Me on Render# PrepTalk.Me Deployment Guide



## Quick Start



1. **Fork this repository** to your GitHub account## 📋 What You'll Need

2. **Sign up at [render.com](https://render.com)**

3. **Get your API keys ready**:

   - MongoDB Atlas URI

   - Groq API key1. **GitHub Account**: Your code needs to be in a GitHub repositoryThis guide will help you deploy both the frontend and backend of PrepTalk.Me on Render.This guide will help you deploy both the frontend (Next.js) and backend (FastAPI) to Render.

   - AssemblyAI API key

   - Google OAuth Client ID2. **Render Account**: Sign up at [render.com](https://render.com) 



## Method 1: One-Click Deploy (Easiest)3. **API Keys**: You'll need keys for MongoDB, Groq, AssemblyAI, and Google OAuth



1. Go to Render Dashboard

2. Click "New" → "Blueprint"

3. Connect this GitHub repository## 🔑 Get Your API Keys Ready## 📋 Prerequisites## Prerequisites

4. Render will create both services automatically

5. Add your environment variables in the service settings



## Method 2: Manual DeployBefore deploying, make sure you have:



### Backend:

- Service type: Web Service

- Build command: `cd backend && pip install -r requirements.txt`  - **MongoDB Atlas URI**: From your MongoDB Atlas dashboard1. **GitHub Repository**: Your code should be in a GitHub repository1. **GitHub Repository**: Push your code to GitHub

- Start command: `cd backend && python main.py`

- Add environment variables: MONGODB_URI, GROQ_API_KEY, ASSEMBLYAI_API_KEY- **Groq API Key**: From groq.com (for AI chat functionality)



### Frontend:- **AssemblyAI API Key**: From assemblyai.com (for speech-to-text)2. **Render Account**: Sign up at [render.com](https://render.com)2. **Render Account**: Sign up at [render.com](https://render.com)

- Service type: Web Service

- Build command: `npm install && npm run build`- **Google Client ID**: From Google Cloud Console (for OAuth)

- Start command: `npm start`

- Add environment variables: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_GOOGLE_CLIENT_ID3. **MongoDB Atlas**: Your database should be accessible from anywhere3. **MongoDB Atlas**: Set up a MongoDB Atlas cluster



## Environment Variables## 🚀 Step 1: Deploy Backend on Render



Set these in Render service settings (not in code):4. **API Keys**: Gather all required API keys



**Backend:**1. **Go to Render Dashboard**

- `MONGODB_URI` - Your MongoDB connection string

- `GROQ_API_KEY` - For AI chat functionality   - Visit [render.com](https://render.com) and sign in## 🔧 Environment Variables

- `ASSEMBLYAI_API_KEY` - For speech-to-text

   - Click "New +" → "Web Service"

**Frontend:** 

- `NEXT_PUBLIC_API_URL` - Your backend service URL## Required Environment Variables

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - For OAuth login

2. **Connect Repository**

## After Deployment

   - Choose "Deploy an existing image from a registry" → "Connect a repository"### Backend Environment Variables

1. Test the deployed apps

2. Check service logs for any issues   - Select your GitHub account and the PrepTalk repository

3. Your apps will be available at the Render URLs

Set these in your Render backend service:### Backend Environment Variables (Set in Render Dashboard)

That's it! 🎉
3. **Configure Backend Service**

   - **Name**: `preptalk-backend`

   - **Region**: Choose closest to your users

   - **Branch**: `main```````bash

   - **Root Directory**: `backend`

   - **Environment**: `Python 3`MONGODB_URI=mongodb+srv://makesure:cKCPuKf8ElD8AExH@cluster0.rkb1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/preptalk?retryWrites=true&w=majority

   - **Build Command**: `pip install -r requirements.txt`

   - **Start Command**: `python main.py`GROQ_API_KEY=gsk_EZ6YjEJTBe8LzfNUgJmlWGdyb3FYZqfP5D3bXBXxmGOOsF2UtHY0GROQ_API_KEY=your_groq_api_key

   - **Instance Type**: `Free`

ASSEMBLYAI_API_KEY=d0f46f6ac32f4caf8a318ae748b15992ASSEMBLYAI_API_KEY=your_assemblyai_api_key

4. **Set Environment Variables**

   Click "Advanced" and add these environment variables:PORT=10000GOOGLE_CLIENT_ID=your_google_client_id

   - `MONGODB_URI` = Your MongoDB connection string

   - `GROQ_API_KEY` = Your Groq API key```GOOGLE_CLIENT_SECRET=your_google_client_secret

   - `ASSEMBLYAI_API_KEY` = Your AssemblyAI key

   - `PORT` = `10000`FRONTEND_URL=https://your-frontend-app.onrender.com



5. **Deploy Backend**### Frontend Environment Variables```

   - Click "Create Web Service"

   - Wait for deployment (5-10 minutes)Set these in your Render frontend service:

   - Note your backend URL (e.g., `https://preptalk-backend.onrender.com`)

### Frontend Environment Variables (Set in Render Dashboard)

## 🌐 Step 2: Deploy Frontend on Render

```

1. **Create Another Web Service**

   - Click "New +" → "Web Service" againNODE_ENV=production```bash

   - Connect the same repository

NEXT_PUBLIC_API_URL=https://preptalk-backend.onrender.comNEXT_PUBLIC_API_BASE_URL=https://your-backend-app.onrender.com

2. **Configure Frontend Service**

   - **Name**: `preptalk-frontend`NEXT_PUBLIC_GOOGLE_CLIENT_ID=853643548315-8le8okjvbj57thq6gcst0b12c6gtqs2n.apps.googleusercontent.com```

   - **Region**: Same as backend

   - **Branch**: `main````

   - **Root Directory**: Leave empty (root)

   - **Environment**: `Node`## Step-by-Step Deployment

   - **Build Command**: `npm install && npm run build`

   - **Start Command**: `npm start`## 🚀 Deployment Steps

   - **Instance Type**: `Free`

### 1. Deploy Backend (FastAPI)

3. **Set Frontend Environment Variables**

   - `NODE_ENV` = `production`### Method 1: Using Render Blueprint (Recommended)

   - `NEXT_PUBLIC_API_URL` = Your backend URL from Step 1

   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = Your Google OAuth Client ID1. **Create Web Service in Render**:



4. **Deploy Frontend**1. **Fork/Clone Repository**   - Go to [Render Dashboard](https://dashboard.render.com)

   - Click "Create Web Service"

   - Wait for deployment (5-10 minutes)   - Ensure your code is in a GitHub repository   - Click "New" → "Web Service"



## ✅ Step 3: Test Your Deployment   - Make sure the `render.yaml` file is in the root directory   - Connect your GitHub repository



1. **Visit Your Frontend URL**

   - Open the URL provided by Render (e.g., `https://preptalk-frontend.onrender.com`)

2. **Connect to Render**2. **Configure Backend Service**:

2. **Test Core Functionality**

   - Try creating an account   - Go to [render.com](https://render.com) and sign in   - **Name**: `preptalk-backend`

   - Test the interview practice feature

   - Check if the recording works   - Click "New" → "Blueprint"   - **Root Directory**: `backend`



3. **Monitor Logs**   - Connect your GitHub repository   - **Environment**: `Python`

   - In Render dashboard, check both services for any errors

   - Look at the "Logs" tab for troubleshooting   - Select the repository with your PrepTalk.Me code   - **Build Command**: `pip install -r requirements.txt`



## 🛠️ Troubleshooting Common Issues   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`



### Backend Won't Start3. **Configure Services**   - **Plan**: Free

- ✅ Check that `requirements.txt` exists in `/backend` folder

- ✅ Verify all environment variables are set correctly   - Render will automatically detect the `render.yaml` configuration

- ✅ Check logs for specific error messages

   - Review the services (backend and frontend)3. **Add Environment Variables**:

### Frontend Build Fails

- ✅ Ensure `package.json` has all dependencies   - Click "Apply" to create both services   - Go to Environment tab

- ✅ Check that Node.js version is compatible

- ✅ Verify `NEXT_PUBLIC_API_URL` points to your backend   - Add all backend environment variables listed above



### Database Connection Issues### Method 2: Manual Deployment

- ✅ Confirm MongoDB URI is correct and accessible

- ✅ Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)4. **Deploy**: Click "Create Web Service"

- ✅ Test the connection string locally first

#### Deploy Backend First:

### API Keys Not Working

- ✅ Double-check all API keys are valid and active### 2. Deploy Frontend (Next.js)

- ✅ Ensure environment variable names match exactly

- ✅ Some APIs have usage limits - check quotas1. **Create Web Service**



## 🎯 Important Notes   - Go to Render Dashboard → "New" → "Web Service"1. **Create Web Service in Render**:



- **Free Tier**: Render free services sleep after 15 minutes of inactivity   - Connect your GitHub repository   - Click "New" → "Web Service"

- **Cold Starts**: First request after sleeping may take 30+ seconds

- **Build Time**: Initial deployment takes 5-10 minutes per service   - Configure:   - Connect the same GitHub repository

- **Logs**: Always check service logs when troubleshooting

     - **Name**: `preptalk-backend`

## 🎉 You're Live!

     - **Environment**: `Python 3`2. **Configure Frontend Service**:

Once both services are deployed and healthy:

- Your frontend will be accessible at your Render URL     - **Build Command**: `cd backend && pip install -r requirements.txt`   - **Name**: `preptalk-frontend`

- Users can register, login, and practice interviews

- All data is stored in your MongoDB Atlas database     - **Start Command**: `cd backend && python main.py`   - **Root Directory**: Leave empty (uses root)



## 🔄 Making Updates     - **Plan**: Free   - **Environment**: `Node`



To update your app:   - **Build Command**: `npm install && npm run build`

1. Push changes to your GitHub repository

2. Render will automatically redeploy both services2. **Set Environment Variables**   - **Start Command**: `npm start`

3. Monitor the deployment in the Render dashboard

   - In the service settings, add the backend environment variables listed above   - **Plan**: Free

---



**Need Help?** Check the logs in your Render dashboard or contact support if you encounter issues.
#### Deploy Frontend:3. **Add Environment Variables**:

   - `NEXT_PUBLIC_API_BASE_URL`: Use your backend URL from step 1

1. **Create Web Service**   - Example: `https://preptalk-backend.onrender.com`

   - Create another web service

   - Configure:4. **Deploy**: Click "Create Web Service"

     - **Name**: `preptalk-frontend`

     - **Environment**: `Node`### 3. Update CORS Settings

     - **Build Command**: `npm install && npm run build`

     - **Start Command**: `npm start`After both services are deployed:

     - **Plan**: Free

1. Note your frontend URL (e.g., `https://preptalk-frontend.onrender.com`)

2. **Set Environment Variables**2. Add `FRONTEND_URL` environment variable to your backend service

   - Add the frontend environment variables3. Redeploy backend service

   - **Important**: Update `NEXT_PUBLIC_API_URL` to match your backend URL

### 4. MongoDB Setup

## 🔗 Service URLs

1. **Create MongoDB Atlas Cluster**:

After deployment, you'll get URLs like:   - Go to [MongoDB Atlas](https://cloud.mongodb.com)

- **Backend**: `https://preptalk-backend.onrender.com`   - Create a free cluster

- **Frontend**: `https://preptalk-frontend.onrender.com`   - Create a database user

   - Whitelist all IP addresses (0.0.0.0/0) for Render access

## 🛠️ Post-Deployment Setup

2. **Get Connection String**:

1. **Update CORS Settings**   - Click "Connect" → "Connect your application"

   - The backend is configured to allow all origins for development   - Copy the connection string

   - For production, consider restricting CORS to your frontend domain   - Replace `<password>` with your database user password



2. **Test the Application**### 5. API Keys Setup

   - Visit your frontend URL

   - Test user registration and login1. **Groq API Key**:

   - Verify API connectivity   - Sign up at [Groq](https://console.groq.com)

   - Generate API key

3. **Monitor Logs**

   - Check Render service logs for any errors2. **AssemblyAI API Key**:

   - Monitor performance and usage   - Sign up at [AssemblyAI](https://www.assemblyai.com)

   - Get API key from dashboard

## 📝 Important Notes

3. **Google OAuth**:

- **Free Tier Limitations**: Render free services sleep after 15 minutes of inactivity   - Go to [Google Cloud Console](https://console.cloud.google.com)

- **Build Time**: Initial deployment may take 5-10 minutes   - Create OAuth 2.0 credentials

- **Environment Variables**: Double-check all environment variables are set correctly   - Add your Render URLs to authorized origins/redirects

- **Database Connection**: Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

## Troubleshooting

## 🔧 Troubleshooting

### Common Issues

### Common Issues:

1. **Build Fails**: Check build logs for missing dependencies

1. **Build Failures**2. **Environment Variables**: Ensure all required vars are set

   - Check that all dependencies are in `requirements.txt` (backend) and `package.json` (frontend)3. **Database Connection**: Check MongoDB URI and network access

   - Verify Python version compatibility4. **CORS Errors**: Verify frontend URL is set in backend environment



2. **Connection Errors**### Logs Access

   - Verify MongoDB URI is correct and accessible

   - Check that GROQ API key is valid- **Backend Logs**: Render Dashboard → Backend Service → Logs

- **Frontend Logs**: Render Dashboard → Frontend Service → Logs

3. **CORS Issues**

   - Ensure frontend URL is properly set in backend CORS configuration## Monitoring



4. **Environment Variables**After deployment, monitor:

   - Verify all required environment variables are set- Service health status

   - Check for typos in variable names- Response times

- Error rates

## 🚀 Next Steps- Database connections



After successful deployment:## Updating Deployments

1. Test all functionality

2. Set up custom domain (optional)Render auto-deploys from your main branch. To update:

3. Configure monitoring and alerts1. Push changes to GitHub

4. Plan for scaling if needed2. Render will automatically rebuild and redeploy



## 📞 Support## Free Tier Limitations



If you encounter issues:Render free tier includes:

1. Check Render service logs- Services sleep after 15 minutes of inactivity

2. Verify environment variables- 750 hours per month per service

3. Test API endpoints directly- Cold start delays

4. Check MongoDB Atlas connectivity
Consider upgrading for production use.

## Support

If you encounter issues:
1. Check Render service logs
2. Verify all environment variables
3. Test API endpoints directly
4. Check database connectivity