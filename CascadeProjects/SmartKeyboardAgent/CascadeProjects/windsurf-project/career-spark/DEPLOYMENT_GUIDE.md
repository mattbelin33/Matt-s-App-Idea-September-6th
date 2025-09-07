# 🚀 Career Spark Deployment Guide

## Prerequisites Installation

### 1. Install Node.js
**Option A: Direct Download (Recommended)**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download **LTS version** (v20.x)
3. Run installer with default settings
4. **Restart terminal/PowerShell**

**Option B: Using Chocolatey**
```powershell
# Install Chocolatey first if not installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node.js
choco install nodejs
```

### 2. Verify Installation
```powershell
node --version
npm --version
```

## Environment Setup

### 1. Create Environment File
Copy `.env.production` to `.env.local`:
```powershell
copy .env.production .env.local
```

### 2. Configure API Keys
Edit `.env.local` with your actual keys:
```env
CAREER_SPARK_API_KEY=your-actual-secret-key
ADMIN_API_KEY=your-actual-admin-key
NEXT_PUBLIC_API_KEY=your-actual-public-key
```

**🔐 Security Notes:**
- `CAREER_SPARK_API_KEY` & `ADMIN_API_KEY`: Server-side only (secure)
- `NEXT_PUBLIC_API_KEY`: Client-side (will be exposed in browser)

## Deployment Commands

### 1. Install Dependencies
```powershell
npm install
```

### 2. Fix TypeScript Issues
```powershell
npm install --save-dev @types/node @types/react @types/react-dom
```

### 3. Build for Production
```powershell
npm run build
```

### 4. Test Locally
```powershell
npm run start
```

### 5. Deploy to Netlify
```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.next
```

## Production Checklist

- [ ] Node.js v20+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] TypeScript types installed
- [ ] `.env.local` configured with real API keys
- [ ] App builds successfully (`npm run build`)
- [ ] App runs locally (`npm run start`)
- [ ] Deployed to production
- [ ] Production URL tested

## Troubleshooting

**TypeScript Errors**: Install missing types with `npm install --save-dev @types/node @types/react @types/react-dom`

**Build Errors**: Ensure all environment variables are set in `.env.local`

**Deployment Errors**: Check `netlify.toml` configuration and build output

## API Keys Generation

Generate secure API keys for production:
```javascript
// Use this in Node.js console to generate keys
crypto.randomBytes(32).toString('hex')
```
