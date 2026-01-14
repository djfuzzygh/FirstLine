# 🚀 Deployment Guide: Getting FirstLine Online

This guide explains how to deploy FirstLine so judges can access it.

## 🧠 Part 1: How to Handle MedGemma (The AI Model)

**Q: Do I need to upload the MedGemma model files to GitHub?**
**A: NO! 🛑**

*   **Why?**: The model files are huge (Gigabytes). GitHub has a file size limit of 100MB.
*   **How it works**: Your Python code (`agent.py`) is written to automatically *download* the model from Hugging Face the first time it runs. You only upload the *code* that does the downloading.

**⚠️ CRITICAL WARNING FOR CLOUD HOSTING:**
Real AI models like MedGemma require massive amounts of RAM (memory) and usually a GPU.
*   **Cheap/Free Hosting** (Render Free, Heroku Free) = ~512MB RAM. **MedGemma will crash instantly.**
*   **Solution**: For this competition submission, deploy your backend in **MOCK MODE**.
    *   This keeps the app fast, reliable, and free.
    *   It demonstrates *all* functionality (Voice, USSD, Rules) without crashing.

---

## 🛠️ Step 1: Push to GitHub

1.  Create a new repository on GitHub.
2.  Run these commands in your project folder:
    ```bash
    git init
    git add .
    git commit -m "Initial submission for FirstLine"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/firstline.git
    git push -u origin main
    ```
    *(Note: The `.gitignore` file I created ensures the model files and other junk are NOT uploaded.)*

---

## 🖥️ Step 2: Deploy Backend (Python)

We will use **Render.com** (it has a great free tier for Python).

1.  Go to [dashboard.render.com](https://dashboard.render.com) and sign up with GitHub.
2.  Click **New +** -> **Web Service**.
3.  Connect your `firstline` repository.
4.  **Settings**:
    *   **Name**: `firstline-backend`
    *   **Root Directory**: `backend`  <-- IMPORTANT!
    *   **Runtime**: `Python 3`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
5.  **Environment Variables** (Scroll down to find this section):
    *   Key: `FIRSTLINE_MODE` | Value: `mock`
    *   *(This ensures it runs fast on the free tier)*
6.  Click **Create Web Service**.
7.  Wait for it to deploy. Copy the URL (e.g., `https://firstline-backend.onrender.com`).

---

## 🌐 Step 3: Deploy Frontend (Web App)

We will use **Vercel** (Easiest for web apps).

1.  **Update your code**:
    *   You need to tell the frontend where the backend is.
    *   Open `web_app/main.js`, `web_app/voice-call.js`, and `web_app/ussd.js`.
    *   Find: `const API_BASE = 'http://localhost:8000';`
    *   Replace with your Render URL: `const API_BASE = 'https://firstline-backend.onrender.com';` (No trailing slash).
    *   Commit and push these changes to GitHub.

2.  **Deploy**:
    *   Go to [vercel.com](https://vercel.com) and sign up with GitHub.
    *   Click **Add New...** -> **Project**.
    *   Import your `firstline` repository.
    *   **Framework Preset**: Select "Other" or "Vite".
    *   **Root Directory**: Click "Edit" and select `web_app`. <-- IMPORTANT!
    *   Click **Deploy**.

---

## 🎉 Done!

You will get a URL like `https://firstline.vercel.app`.
*   Submit this URL to Kaggle.
*   The Judges can open it on their phones or laptops.
*   Because you used `FIRSTLINE_MODE=mock`, it will be fast and reliable.

### ❓ "But I want REAL AI!"
If you absolutely need the real MedGemma model running online, you cannot use free hosting. You must:
1.  Rent a GPU server (e.g., Lambda Labs or Hugging Face Spaces GPU tier).
2.  It costs money (~$1-2/hour).
3.  For a hackathon/competition, **simulated (mock) reliability is usually better** than a flaky real model that might crash during judging.
