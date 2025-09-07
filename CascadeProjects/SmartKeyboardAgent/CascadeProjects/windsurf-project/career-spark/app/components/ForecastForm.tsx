'use client'

import { useState } from 'react'

interface ForecastData {
  powerScore: number
  futureRoles: {
    role: string
    probability: number
    timeframe: string
    requiredSkills: string[]
  }[]
  industries: {
    name: string
    growthRate: number
    demandLevel: 'High' | 'Medium' | 'Low'
    averageSalary: string
  }[]
  blurb: string
}

export default function ForecastForm() {
  const [jobTitle, setJobTitle] = useState('')
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setForecast(null)

    try {
      const response = await fetch('/api/forecast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'demo-user-key'
        },
        body: JSON.stringify({
          jobTitle: jobTitle.trim(),
          linkedInUrl: linkedInUrl.trim()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API Error: ${response.status}`)
      }

      const data = await response.json()
      setForecast(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate forecast')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🔮 Career Forecast
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Current Job Title *
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Software Engineer, Data Analyst, Product Manager"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="linkedInUrl" className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Profile URL *
            </label>
            <input
              type="url"
              id="linkedInUrl"
              value={linkedInUrl}
              onChange={(e) => setLinkedInUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !jobTitle.trim() || !linkedInUrl.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '🔄 Analyzing Career Path...' : '🚀 Generate Forecast'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {forecast && (
          <div className="mt-8 space-y-6">
            {/* Power Score */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">⚡ Career Power Score</h3>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-blue-600">{forecast.powerScore}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${forecast.powerScore}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">out of 100</p>
                </div>
              </div>
            </div>

            {/* Future Roles */}
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">🎯 Future Career Roles</h3>
              <div className="space-y-3">
                {forecast.futureRoles.map((role, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-purple-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{role.role}</h4>
                      <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {role.probability}% likely
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Timeline: {role.timeframe}</p>
                    <div className="flex flex-wrap gap-1">
                      {role.requiredSkills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">🏭 Top Industries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forecast.industries.map((industry, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-gray-800 mb-2">{industry.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-green-600">📈 Growth: {industry.growthRate}%</p>
                      <p className="text-blue-600">🎯 Demand: {industry.demandLevel}</p>
                      <p className="text-purple-600">💰 Avg Salary: {industry.averageSalary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Blurb */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">📝 Career Analysis</h3>
              <p className="text-gray-700 leading-relaxed">{forecast.blurb}</p>
            </div>

            {/* Share Button */}
            <button
              onClick={() => {
                const shareText = `🚀 My Career Forecast: ${forecast.powerScore}/100 Power Score! Next role: ${forecast.futureRoles[0]?.role}. Generated by Career Spark AI. #CareerForecast #ProfessionalDevelopment`
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(shareText)}`
                window.open(url, '_blank')
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-cyan-600"
            >
              📱 Share Forecast on LinkedIn
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
