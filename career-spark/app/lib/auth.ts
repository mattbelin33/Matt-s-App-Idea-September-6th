import { NextRequest } from 'next/server'

export interface ApiKeyValidation {
  isValid: boolean
  keyType: 'user' | 'admin' | null
  rateLimitKey: string
}

export function validateApiKey(request: NextRequest): ApiKeyValidation {
  const apiKey = request.headers.get('x-api-key') || request.nextUrl.searchParams.get('api_key')
  
  if (!apiKey) {
    return {
      isValid: false,
      keyType: null,
      rateLimitKey: ''
    }
  }

  const userApiKey = process.env.CAREER_SPARK_API_KEY
  const adminApiKey = process.env.ADMIN_API_KEY

  if (apiKey === adminApiKey) {
    return {
      isValid: true,
      keyType: 'admin',
      rateLimitKey: `admin:${apiKey.slice(-8)}`
    }
  }

  if (apiKey === userApiKey) {
    return {
      isValid: true,
      keyType: 'user',
      rateLimitKey: `user:${apiKey.slice(-8)}`
    }
  }

  return {
    isValid: false,
    keyType: null,
    rateLimitKey: ''
  }
}

export function createApiResponse(data: any, status: number = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-RateLimit-Limit': process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '60',
      'X-API-Version': '1.0'
    }
  })
}

export function createErrorResponse(message: string, status: number = 400) {
  return Response.json(
    {
      error: message,
      timestamp: new Date().toISOString(),
      status
    },
    { status }
  )
}
