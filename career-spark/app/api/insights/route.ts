import { NextRequest } from 'next/server'
import { validateApiKey, createApiResponse, createErrorResponse } from '../../lib/auth'
import { checkRateLimit, getRateLimitHeaders } from '../../lib/rateLimit'

const careerInsights = [
  "Your next breakthrough comes from combining your unique skills in unexpected ways. What two of your strengths haven't you paired together yet?",
  "The best career moves often feel uncomfortable at first. That nervous energy? It's growth knocking at your door.",
  "Your network isn't just who you know—it's who knows what you're capable of. Make sure they really know.",
  "Every 'no' is data. Collect enough data, and you'll find the pattern that leads to 'yes.'",
  "Your career isn't a ladder—it's a jungle gym. Sometimes the best path is sideways, not up.",
  "The skills that got you here won't get you there. What's the one skill you've been avoiding learning?",
  "Your biggest career asset isn't your resume—it's your reputation. What story are people telling about you?",
  "Stop waiting for permission to be great. The best time to start was yesterday. The second best time is now.",
  "Your comfort zone is a beautiful place, but nothing ever grows there. What's one small step outside it?",
  "The future belongs to those who can adapt, learn, and unlearn quickly. What outdated belief are you holding onto?"
]

export async function GET(request: NextRequest) {
  try {
    // Validate API key
    const auth = validateApiKey(request)
    if (!auth.isValid) {
      return createErrorResponse('Invalid or missing API key', 401)
    }

    // Check rate limiting
    const rateLimit = checkRateLimit(auth.rateLimitKey, 60)
    if (!rateLimit.success) {
      return Response.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimit)
        }
      )
    }

    const randomInsight = careerInsights[Math.floor(Math.random() * careerInsights.length)]
    
    return Response.json({
      insight: randomInsight,
      timestamp: new Date().toISOString(),
      keyType: auth.keyType
    }, {
      headers: getRateLimitHeaders(rateLimit)
    })
  } catch (error) {
    return createErrorResponse('Failed to generate insight', 500)
  }
}
