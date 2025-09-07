# 🔧 **Career Spark Production Setup**

## After Installing Node.js:

### 1. Create Environment File
```powershell
# Navigate to career-spark directory
cd "c:\Users\mattb\CascadeProjects\SmartKeyboardAgent\CascadeProjects\windsurf-project\career-spark"

# Copy production template to local environment
copy .env.production .env.local
```

### 2. Generate Secure API Keys
Open Node.js and generate random keys:
```javascript
// Run this in Node.js console (type 'node' in terminal)
console.log('CAREER_SPARK_API_KEY=' + require('crypto').randomBytes(32).toString('hex'));
console.log('ADMIN_API_KEY=' + require('crypto').randomBytes(32).toString('hex'));
console.log('NEXT_PUBLIC_API_KEY=' + require('crypto').randomBytes(16).toString('hex'));
```

### 3. Edit .env.local
Replace the placeholder values in `.env.local` with your generated keys:
```env
CAREER_SPARK_API_KEY=your-generated-secret-key
ADMIN_API_KEY=your-generated-admin-key
NEXT_PUBLIC_API_KEY=your-generated-public-key
```

### 4. Install Dependencies & Deploy
```powershell
# Install all dependencies
npm install

# Install TypeScript types
npm install --save-dev @types/node @types/react @types/react-dom

# Build for production
npm run build

# Test locally (optional)
npm run start

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

## 🔒 **Security Best Practices**

- **Server Keys**: `CAREER_SPARK_API_KEY` and `ADMIN_API_KEY` are server-only (secure)
- **Public Key**: `NEXT_PUBLIC_API_KEY` will be visible in browser (use for client-side API calls)
- **Never commit**: `.env.local` is gitignored for security

## 🎯 **Ready for Production**

Once Node.js is installed and environment variables are configured, your Career Spark app will be ready for deployment with:
- ✅ Complete forecast API
- ✅ LinkedIn integration
- ✅ Rate limiting & security
- ✅ Professional UI/UX
- ✅ Mobile responsive design
