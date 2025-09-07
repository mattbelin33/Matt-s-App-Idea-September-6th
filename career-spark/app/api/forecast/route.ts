import { NextRequest } from 'next/server'
import { validateApiKey, createErrorResponse } from '../../lib/auth'
import { checkRateLimit, getRateLimitHeaders } from '../../lib/rateLimit'
import { 
  calculatePowerScore, 
  predictFutureRoles, 
  analyzeIndustries, 
  generateCareerBlurb,
  ForecastInput,
  ForecastResponse 
} from '../../lib/forecast'

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    const auth = validateApiKey(request)
    if (!auth.isValid) {
      return createErrorResponse('Invalid or missing API key', 401)
    }

    // Check rate limiting (stricter for forecast API due to complexity)
    const rateLimit = checkRateLimit(auth.rateLimitKey, auth.keyType === 'admin' ? 50 : 20)
    if (!rateLimit.success) {
      return Response.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimit)
        }
      )
    }

    // Parse request body
    const body: ForecastInput = await request.json()
    const { jobTitle, linkedInUrl } = body

    // Validate input
    if (!jobTitle || typeof jobTitle !== 'string' || jobTitle.trim().length === 0) {
      return createErrorResponse('Job title is required and must be a non-empty string', 400)
    }

    if (!linkedInUrl || typeof linkedInUrl !== 'string') {
      return createErrorResponse('LinkedIn URL is required and must be a string', 400)
    }

    // Basic LinkedIn URL validation
    if (!linkedInUrl.includes('linkedin.com')) {
      return createErrorResponse('Invalid LinkedIn URL format', 400)
    }

    // Generate forecast analysis
    const powerScore = calculatePowerScore(jobTitle.trim(), linkedInUrl.trim())
    const futureRoles = predictFutureRoles(jobTitle.trim())
    const industries = analyzeIndustries(jobTitle.trim())
    const blurb = generateCareerBlurb(jobTitle.trim(), powerScore, futureRoles, industries)

    const forecast: ForecastResponse = {
      powerScore,
      futureRoles,
      industries,
      blurb,
      analysisDate: new Date().toISOString()
    }

    return Response.json({
      success: true,
      data: forecast,
      metadata: {
        jobTitle: jobTitle.trim(),
        linkedInUrl: linkedInUrl.trim(),
        keyType: auth.keyType,
        timestamp: new Date().toISOString()
      }
    }, {
      headers: getRateLimitHeaders(rateLimit)
    })

  } catch (error) {
    console.error('Forecast API error:', error)
    
    if (error instanceof SyntaxError) {
      return createErrorResponse('Invalid JSON in request body', 400)
    }
    
    return createErrorResponse('Failed to generate career forecast', 500)
  }
}

// GET endpoint for API documentation
export async function GET(request: NextRequest) {
  return Response.json({
    endpoint: '/api/forecast',
    method: 'POST',
    description: 'Generate career forecast based on job title and LinkedIn profile',
    authentication: 'Required (API key)',
    rateLimit: {
      user: '20 requests/minute',
      admin: '50 requests/minute'
    },
    requestBody: {
      jobTitle: 'string (required) - Current job title',
      linkedInUrl: 'string (required) - LinkedIn profile URL'
    },
    responseFormat: {
      powerScore: 'number (0-100) - Career potential score',
      futureRoles: 'array - Predicted career progression',
      industries: 'array - Relevant industry opportunities',
      blurb: 'string - Personalized career analysis summary',
      analysisDate: 'string - ISO timestamp of analysis'
    },
    example: {
      request: {
        jobTitle: 'Software Engineer',
        linkedInUrl: 'https://linkedin.com/in/johndoe'
      },
      response: {
        powerScore: 78,
        futureRoles: [
          {
            role: 'Senior Software Engineer',
            probability: 85,
            timeframe: '2-4 years',
            requiredSkills: ['Leadership', 'System Design', 'Mentoring']
          }
        ],
        industries: [
          {
            name: 'Technology',
            growthRate: 15.2,
            demandLevel: 'High',
            averageSalary: '$95,000'
          }
        ],
        blurb: 'Based on your Software Engineer background...'
      }
    }
  })
}
