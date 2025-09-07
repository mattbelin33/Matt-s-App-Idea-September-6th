# Career Spark API Documentation

## Overview
Career Spark API provides AI-powered career insights and motivational quotes with API key authentication and rate limiting.

## Authentication
All API endpoints require authentication via API key.

### Methods
- **Header**: `x-api-key: YOUR_API_KEY`
- **Query Parameter**: `?api_key=YOUR_API_KEY`

### API Key Types
- **User Key**: Standard access with 60 requests/minute
- **Admin Key**: Administrative access with 100 requests/minute

## Environment Setup

Create a `.env.local` file:
```env
CAREER_SPARK_API_KEY=your-secret-user-key
ADMIN_API_KEY=your-admin-key
NEXT_PUBLIC_API_KEY=your-public-key-for-frontend
RATE_LIMIT_REQUESTS_PER_MINUTE=60
```

## Endpoints

### 1. Career Insights
**GET** `/api/insights`

Generates AI-powered career advice and professional tips.

**Headers:**
```
x-api-key: YOUR_API_KEY
```

**Response:**
```json
{
  "insight": "Your next breakthrough comes from combining your unique skills...",
  "timestamp": "2025-08-31T22:09:05.000Z",
  "keyType": "user"
}
```

### 2. Motivational Quotes
**GET** `/api/quotes`

Fetches inspirational quotes from external API with fallback.

**Headers:**
```
x-api-key: YOUR_API_KEY
```

**Response:**
```json
{
  "quote": "\"Success is not final, failure is not fatal...\" - Winston Churchill",
  "source": "api",
  "timestamp": "2025-08-31T22:09:05.000Z",
  "keyType": "user"
}
```

### 3. Career Forecast
**POST** `/api/forecast`

Generates comprehensive career predictions based on job title and LinkedIn profile.

**Headers:**
```
x-api-key: YOUR_API_KEY
Content-Type: application/json
```

**Request Body:**
```json
{
  "jobTitle": "Software Engineer",
  "linkedInUrl": "https://linkedin.com/in/johndoe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "powerScore": 78,
    "futureRoles": [
      {
        "role": "Senior Software Engineer",
        "probability": 85,
        "timeframe": "2-4 years",
        "requiredSkills": ["Leadership", "System Design", "Mentoring"]
      }
    ],
    "industries": [
      {
        "name": "Technology",
        "growthRate": 15.2,
        "demandLevel": "High",
        "averageSalary": "$95,000"
      }
    ],
    "blurb": "Based on your Software Engineer background, you show strong career potential...",
    "analysisDate": "2025-08-31T22:14:46.000Z"
  }
}
```

**Rate Limits:**
- User Keys: 20 requests/minute
- Admin Keys: 50 requests/minute

### 4. API Status
**GET** `/api/status`

Returns API status and configuration (no authentication required).

**Response:**
```json
{
  "status": "active",
  "version": "1.0.0",
  "authenticated": true,
  "endpoints": {
    "insights": "/api/insights",
    "quotes": "/api/quotes",
    "forecast": "/api/forecast",
    "admin": "/api/admin/keys"
  },
  "rateLimit": {
    "requestsPerMinute": 60,
    "requestsPerHour": 1000
  }
}
```

### 4. Admin - Key Management
**GET** `/api/admin/keys`

Lists all API keys (admin access required).

**Headers:**
```
x-api-key: YOUR_ADMIN_KEY
```

**Response:**
```json
{
  "keys": [
    {
      "keyId": "demo-key",
      "type": "user",
      "created": "2025-08-31T22:09:05.000Z",
      "requestCount": 42
    }
  ],
  "total": 2
}
```

**POST** `/api/admin/keys`

Creates new API key (admin access required).

**Headers:**
```
x-api-key: YOUR_ADMIN_KEY
Content-Type: application/json
```

**Body:**
```json
{
  "type": "user"
}
```

**Response:**
```json
{
  "message": "API key created successfully",
  "keyId": "abc12345",
  "key": "cs_user_newgeneratedkey123456789",
  "type": "user",
  "created": "2025-08-31T22:09:05.000Z"
}
```

## Rate Limiting

All endpoints include rate limiting headers:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1693526945
```

### Limits
- **User Keys**: 60 requests/minute
- **Admin Keys**: 100 requests/minute

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Invalid or missing API key",
  "timestamp": "2025-08-31T22:09:05.000Z",
  "status": 401
}
```

### 429 Rate Limited
```json
{
  "error": "Rate limit exceeded",
  "timestamp": "2025-08-31T22:09:05.000Z",
  "status": 429
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required",
  "timestamp": "2025-08-31T22:09:05.000Z",
  "status": 403
}
```

## Usage Examples

### cURL
```bash
# Get career insight
curl -H "x-api-key: your-key" https://your-domain.com/api/insights

# Get motivational quote
curl -H "x-api-key: your-key" https://your-domain.com/api/quotes

# Create new API key (admin)
curl -X POST \
  -H "x-api-key: your-admin-key" \
  -H "Content-Type: application/json" \
  -d '{"type":"user"}' \
  https://your-domain.com/api/admin/keys
```

### JavaScript
```javascript
const apiKey = 'your-api-key';

// Get career insight
const insight = await fetch('/api/insights', {
  headers: { 'x-api-key': apiKey }
});
const data = await insight.json();

// Get quote
const quote = await fetch('/api/quotes', {
  headers: { 'x-api-key': apiKey }
});
const quoteData = await quote.json();
```

### Python
```python
import requests

headers = {'x-api-key': 'your-api-key'}

# Get career insight
response = requests.get('https://your-domain.com/api/insights', headers=headers)
insight = response.json()

# Get quote
response = requests.get('https://your-domain.com/api/quotes', headers=headers)
quote = response.json()
```

## Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use environment variables** for key storage
3. **Rotate keys regularly** for production use
4. **Monitor rate limits** to avoid service disruption
5. **Use HTTPS** for all API requests

## Production Deployment

1. Set secure environment variables
2. Configure proper CORS policies
3. Implement database storage for keys (replace in-memory storage)
4. Add logging and monitoring
5. Set up proper error tracking
