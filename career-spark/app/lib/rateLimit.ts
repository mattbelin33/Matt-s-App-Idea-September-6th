interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory rate limiting (for production, use Redis or database)
const rateLimitStore: RateLimitStore = {}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
}

export function checkRateLimit(key: string, limit: number = 60): RateLimitResult {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const resetTime = now + windowMs

  if (!rateLimitStore[key]) {
    rateLimitStore[key] = {
      count: 1,
      resetTime
    }
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime
    }
  }

  const record = rateLimitStore[key]

  // Reset if window has passed
  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = resetTime
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime
    }
  }

  // Check if limit exceeded
  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: record.resetTime
    }
  }

  // Increment counter
  record.count++
  return {
    success: true,
    limit,
    remaining: limit - record.count,
    resetTime: record.resetTime
  }
}

export function getRateLimitHeaders(result: RateLimitResult) {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString()
  }
}
