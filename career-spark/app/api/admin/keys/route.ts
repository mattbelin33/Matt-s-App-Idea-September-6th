import { NextRequest } from 'next/server'
import { validateApiKey, createErrorResponse } from '../../../lib/auth'
import { checkRateLimit, getRateLimitHeaders } from '../../../lib/rateLimit'

interface ApiKeyInfo {
  key: string
  type: 'user' | 'admin'
  created: string
  lastUsed?: string
  requestCount: number
}

// In production, this would be stored in a database
const apiKeys: ApiKeyInfo[] = [
  {
    key: process.env.CAREER_SPARK_API_KEY || 'demo-user-key',
    type: 'user',
    created: new Date().toISOString(),
    requestCount: 0
  },
  {
    key: process.env.ADMIN_API_KEY || 'demo-admin-key',
    type: 'admin',
    created: new Date().toISOString(),
    requestCount: 0
  }
]

export async function GET(request: NextRequest) {
  try {
    // Validate admin API key
    const auth = validateApiKey(request)
    if (!auth.isValid || auth.keyType !== 'admin') {
      return createErrorResponse('Admin access required', 403)
    }

    // Check rate limiting
    const rateLimit = checkRateLimit(auth.rateLimitKey, 100)
    if (!rateLimit.success) {
      return Response.json(
        { error: 'Rate limit exceeded' },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimit)
        }
      )
    }

    // Return sanitized key info (hide actual keys)
    const sanitizedKeys = apiKeys.map(key => ({
      keyId: key.key.slice(-8),
      type: key.type,
      created: key.created,
      lastUsed: key.lastUsed,
      requestCount: key.requestCount
    }))

    return Response.json({
      keys: sanitizedKeys,
      total: apiKeys.length,
      timestamp: new Date().toISOString()
    }, {
      headers: getRateLimitHeaders(rateLimit)
    })
  } catch (error) {
    return createErrorResponse('Failed to fetch API keys', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate admin API key
    const auth = validateApiKey(request)
    if (!auth.isValid || auth.keyType !== 'admin') {
      return createErrorResponse('Admin access required', 403)
    }

    const body = await request.json()
    const { type = 'user' } = body

    if (!['user', 'admin'].includes(type)) {
      return createErrorResponse('Invalid key type. Must be "user" or "admin"', 400)
    }

    // Generate new API key
    const newKey = `cs_${type}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    
    const newApiKey: ApiKeyInfo = {
      key: newKey,
      type: type as 'user' | 'admin',
      created: new Date().toISOString(),
      requestCount: 0
    }

    apiKeys.push(newApiKey)

    return Response.json({
      message: 'API key created successfully',
      keyId: newKey.slice(-8),
      key: newKey, // Only return full key on creation
      type: newApiKey.type,
      created: newApiKey.created
    }, { status: 201 })
  } catch (error) {
    return createErrorResponse('Failed to create API key', 500)
  }
}
