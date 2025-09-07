import { useState, useEffect } from 'react'

const ads = [
  {
    text: "🚀 Boost Your LinkedIn Profile - Get noticed by recruiters with our professional optimization service",
    url: "#"
  },
  {
    text: "📚 Master New Skills - Unlock your potential with our curated online courses",
    url: "#"
  },
  {
    text: "💼 Career Coaching - 1-on-1 sessions with industry experts to accelerate your growth",
    url: "#"
  }
]

export default function AdBanner() {
  const [currentAd, setCurrentAd] = useState(ads[0])

  useEffect(() => {
    const randomAd = ads[Math.floor(Math.random() * ads.length)]
    setCurrentAd(randomAd)
  }, [])

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 my-5 text-center text-sm text-gray-600 relative">
      <div className="absolute top-1 right-3 text-xs text-gray-400 uppercase">Ad</div>
      <a 
        href={currentAd.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-blue-600 transition-colors duration-300 block hover:-translate-y-px"
      >
        {currentAd.text}
      </a>
    </div>
  )
}
