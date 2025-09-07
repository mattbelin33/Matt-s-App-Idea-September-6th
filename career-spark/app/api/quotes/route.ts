import { NextRequest } from 'next/server'
import { validateApiKey, createErrorResponse } from '../../lib/auth'
import { checkRateLimit, getRateLimitHeaders } from '../../lib/rateLimit'

const fallbackQuotes = [
  '"Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill',
  '"The only way to do great work is to love what you do." - Steve Jobs',
  '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
  '"Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work." - Steve Jobs',
  '"The future depends on what you do today." - Mahatma Gandhi',
  '"Don\'t be afraid to give up the good to go for the great." - John D. Rockefeller',
  '"The way to get started is to quit talking and begin doing." - Walt Disney',
  '"If you really look closely, most overnight successes took a long time." - Steve Jobs',
  '"The only impossible journey is the one you never begin." - Tony Robbins',
  '"Success is walking from failure to failure with no loss of enthusiasm." - Winston Churchill'
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

    // Try to fetch from external API first
    try {
      const response = await fetch('https://api.quotable.io/random?tags=motivational,success,wisdom&minLength=50')
      
      if (response.ok) {
        const data = await response.json()
        return Response.json({
          quote: `"${data.content}" - ${data.author}`,
          source: 'api',
          timestamp: new Date().toISOString(),
          keyType: auth.keyType
        }, {
          headers: getRateLimitHeaders(rateLimit)
        })
      }
    } catch (apiError) {
      // Continue to fallback
    }

    // Fallback to local quotes if API fails
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
    
    return Response.json({
      quote: randomQuote,
      source: 'fallback',
      timestamp: new Date().toISOString(),
      keyType: auth.keyType
    }, {
      headers: getRateLimitHeaders(rateLimit)
    })
  } catch (error) {
    return createErrorResponse('Failed to generate quote', 500)
  }
}
