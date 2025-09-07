'use client'

import { useState } from 'react'
import Header from './components/Header'
import ActionCard from './components/ActionCard'
import ResultCard from './components/ResultCard'
import AdBanner from './components/AdBanner'
import LoadingSpinner from './components/LoadingSpinner'

export default function Home() {
  const [currentResult, setCurrentResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [adShown, setAdShown] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)

  const handleGenerateInsight = async () => {
    setIsLoading(true)
    setShowResult(false)
    handleAdDisplay()
    
    try {
      const response = await fetch('/api/insights', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'demo-user-key'
        }
      })
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      
      const data = await response.json()
      setCurrentResult(data.insight)
    } catch (error) {
      setCurrentResult('Unable to generate insight. Please check your API key.')
    } finally {
      setIsLoading(false)
      setShowResult(true)
    }
  }

  const handleGenerateQuote = async () => {
    setIsLoading(true)
    setShowResult(false)
    handleAdDisplay()
    
    try {
      const response = await fetch('/api/quotes', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'demo-user-key'
        }
      })
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      
      const data = await response.json()
      setCurrentResult(data.quote)
    } catch (error) {
      setCurrentResult('Unable to generate quote. Please check your API key.')
    } finally {
      setIsLoading(false)
      setShowResult(true)
    }
  }

  const handleAdDisplay = () => {
    setInteractionCount(prev => prev + 1)
    if (interactionCount >= 1 && !adShown) {
      setAdShown(true)
      // Hide ad after 10 seconds
      setTimeout(() => setAdShown(false), 10000)
    }
  }

  const handleNewSpark = () => {
    setShowResult(false)
    setCurrentResult('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <Header />
        
        <div className="p-8">
          <ActionCard
            icon="🎯"
            title="Get Career Insight"
            description="Discover personalized career tips and insights powered by AI"
            buttonText="Spark My Career!"
            onClick={handleGenerateInsight}
          />
          
          <ActionCard
            icon="💡"
            title="Daily Motivation"
            description="Get inspired with professional quotes and wisdom"
            buttonText="Inspire Me!"
            onClick={handleGenerateQuote}
          />
          
          <ActionCard
            icon="🔮"
            title="Career Forecast"
            description="Get AI-powered career predictions and future role analysis"
            buttonText="View Forecast!"
            onClick={() => window.location.href = '/forecast'}
          />
          
          {adShown && <AdBanner />}
          
          {isLoading && <LoadingSpinner />}
          
          {showResult && (
            <ResultCard
              content={currentResult}
              onShare={() => {
                const text = encodeURIComponent(`${currentResult}\n\n#CareerSpark #ProfessionalDevelopment #CareerTips`)
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`
                window.open(url, '_blank')
              }}
              onNewSpark={handleNewSpark}
            />
          )}
        </div>
      </div>
    </div>
  )
}
