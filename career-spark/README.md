# Career Spark - Next.js + Tailwind CSS

A modern, scalable version of Career Spark built with Next.js and Tailwind CSS for enhanced performance and developer experience.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Heroicons
- **API**: Next.js API Routes

## 📁 Project Structure

```
career-spark/
├── app/
│   ├── api/
│   │   ├── insights/route.ts    # Career insights API
│   │   └── quotes/route.ts      # Motivational quotes API
│   ├── components/
│   │   ├── Header.tsx           # App header component
│   │   ├── ActionCard.tsx       # Interactive cards
│   │   ├── ResultCard.tsx       # Results display
│   │   ├── AdBanner.tsx         # Ad placement
│   │   └── LoadingSpinner.tsx   # Loading states
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## ✨ Features

- **Server-Side Rendering**: Fast initial page loads
- **API Routes**: Built-in backend functionality
- **Responsive Design**: Mobile-first approach with Tailwind
- **TypeScript**: Type safety and better DX
- **Component Architecture**: Reusable React components
- **Modern Animations**: Smooth transitions and effects

## 🎯 Key Components

### ActionCard
Interactive cards for user actions with hover effects and responsive design.

### ResultCard
Displays generated content with LinkedIn sharing functionality.

### AdBanner
Non-intrusive ad placement with smart timing.

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build the app
npm run build

# Deploy the 'out' folder to Netlify
```

### Manual Deployment
```bash
# Build for production
npm run build

# The built files will be in the '.next' folder
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Customization
Modify `tailwind.config.js` to customize colors, animations, and breakpoints.

### API Configuration
Update API routes in `app/api/` to integrate with external services or databases.

## 📱 Mobile Optimization

The app is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized typography and spacing
- Fast loading on mobile networks

## 🚀 Performance Features

- **Static Generation**: Pre-rendered pages for better SEO
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loads
- **Caching**: Built-in caching strategies

## 🔮 Future Enhancements

- User authentication with NextAuth.js
- Database integration with Prisma
- Advanced analytics with Vercel Analytics
- PWA capabilities
- Real-time features with WebSockets

## 📄 License

Open source - MIT License

---

**Built with Next.js 14 and Tailwind CSS for modern web development**
