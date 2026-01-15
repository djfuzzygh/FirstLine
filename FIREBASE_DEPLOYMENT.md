# 🔥 Firebase Deployment (Ready to Go!)

I have successfully installed the Firebase tools for you! you just need to log in and deploy.

## ✅ Step 1: Login
Copy and paste this command into your terminal:
```bash
npx firebase login
```
*   It will open a browser window.
*   Log in with your Google Account.
*   Click **Allow**.

## ✅ Step 2: Initialize
Run this command to link your project:
```bash
npx firebase init hosting
```
*   Select **"Use an existing project"** (if you made one) or **"Create a new project"**.
*   **Public Directory**: Type `web_app` and hit Enter.
*   **Single Page App**: Type `No` (N).
*   **Overwrite index.html**: Type `No` (N).

## ✅ Step 3: Deploy
Run this to put it online:
```bash
npx firebase deploy
```

## 🔗 Success!
It will give you a URL like: `https://your-project.web.app`
**Send this URL to the judges!**
