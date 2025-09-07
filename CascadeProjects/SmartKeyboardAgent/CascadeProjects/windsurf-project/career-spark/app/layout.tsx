import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Career Spark - AI-Powered Career Insights',
  description: 'Generate AI-powered career insights and motivational quotes to boost your LinkedIn engagement',
  keywords: 'career, AI, insights, motivation, LinkedIn, professional development',
  authors: [{ name: 'Career Spark' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">
        {children}
      </body>
    </html>
  )
}
