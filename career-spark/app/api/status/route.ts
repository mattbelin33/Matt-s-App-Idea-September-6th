import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key') || request.nextUrl.searchParams.get('api_key')
  
  return Response.json({
    status: 'active',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    authenticated: !!apiKey,
    endpoints: {
      insights: '/api/insights',
      quotes: '/api/quotes',
      forecast: '/api/forecast',
      admin: '/api/admin/keys'
    },
    rateLimit: {
      requestsPerMinute: 60,
      requestsPerHour: 1000
    },
    authentication: {
      required: true,
      methods: ['header: x-api-key', 'query: api_key']
    }
  })
}
