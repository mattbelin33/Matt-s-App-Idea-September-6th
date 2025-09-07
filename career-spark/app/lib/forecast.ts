// Career forecast analysis utilities
export interface ForecastInput {
  jobTitle: string
  linkedInUrl: string
}

export interface ForecastResponse {
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
  analysisDate: string
}

// Job market data and career progression patterns
const CAREER_PROGRESSION_MAP: Record<string, string[]> = {
  'software engineer': [
    'Senior Software Engineer',
    'Tech Lead',
    'Engineering Manager',
    'Principal Engineer',
    'VP of Engineering'
  ],
  'data analyst': [
    'Senior Data Analyst',
    'Data Scientist',
    'Analytics Manager',
    'Head of Analytics',
    'Chief Data Officer'
  ],
  'product manager': [
    'Senior Product Manager',
    'Principal Product Manager',
    'Director of Product',
    'VP of Product',
    'Chief Product Officer'
  ],
  'marketing specialist': [
    'Marketing Manager',
    'Senior Marketing Manager',
    'Marketing Director',
    'VP of Marketing',
    'Chief Marketing Officer'
  ],
  'sales representative': [
    'Senior Sales Rep',
    'Sales Manager',
    'Regional Sales Director',
    'VP of Sales',
    'Chief Revenue Officer'
  ]
}

const INDUSTRY_DATA = {
  'Technology': { growthRate: 15.2, demandLevel: 'High' as const, avgSalary: '$95,000' },
  'Healthcare': { growthRate: 8.1, demandLevel: 'High' as const, avgSalary: '$75,000' },
  'Finance': { growthRate: 6.3, demandLevel: 'Medium' as const, avgSalary: '$85,000' },
  'E-commerce': { growthRate: 12.8, demandLevel: 'High' as const, avgSalary: '$70,000' },
  'Artificial Intelligence': { growthRate: 22.5, demandLevel: 'High' as const, avgSalary: '$120,000' },
  'Renewable Energy': { growthRate: 18.7, demandLevel: 'High' as const, avgSalary: '$80,000' },
  'Cybersecurity': { growthRate: 13.4, demandLevel: 'High' as const, avgSalary: '$105,000' }
}

export function calculatePowerScore(jobTitle: string, linkedInUrl: string): number {
  let score = 50 // Base score
  
  // Job title analysis
  const title = jobTitle.toLowerCase()
  
  // High-demand roles get bonus points
  if (title.includes('engineer') || title.includes('developer')) score += 20
  if (title.includes('data') || title.includes('ai') || title.includes('ml')) score += 15
  if (title.includes('manager') || title.includes('director')) score += 10
  if (title.includes('senior') || title.includes('lead')) score += 8
  
  // LinkedIn URL analysis (basic validation and scoring)
  if (linkedInUrl && linkedInUrl.includes('linkedin.com')) {
    score += 5 // Valid LinkedIn profile
    
    // Extract potential insights from URL structure
    if (linkedInUrl.includes('/in/')) score += 3
  }
  
  // Ensure score is within bounds
  return Math.min(Math.max(score, 0), 100)
}

export function predictFutureRoles(jobTitle: string): ForecastResponse['futureRoles'] {
  const title = jobTitle.toLowerCase()
  
  // Find matching career path
  let progressionPath: string[] = []
  for (const [key, path] of Object.entries(CAREER_PROGRESSION_MAP)) {
    if (title.includes(key.split(' ')[0])) {
      progressionPath = path
      break
    }
  }
  
  // Default progression if no match found
  if (progressionPath.length === 0) {
    progressionPath = [
      `Senior ${jobTitle}`,
      `${jobTitle} Manager`,
      `Director of ${jobTitle.split(' ')[0]}`,
      `VP of ${jobTitle.split(' ')[0]}`
    ]
  }
  
  return progressionPath.slice(0, 4).map((role, index) => ({
    role,
    probability: Math.max(85 - (index * 15), 25),
    timeframe: `${2 + index}-${4 + index} years`,
    requiredSkills: generateRequiredSkills(role, jobTitle)
  }))
}

export function analyzeIndustries(jobTitle: string): ForecastResponse['industries'] {
  const title = jobTitle.toLowerCase()
  const relevantIndustries: string[] = []
  
  // Map job titles to relevant industries
  if (title.includes('engineer') || title.includes('developer') || title.includes('tech')) {
    relevantIndustries.push('Technology', 'Artificial Intelligence', 'Cybersecurity')
  }
  if (title.includes('data') || title.includes('analyst')) {
    relevantIndustries.push('Technology', 'Finance', 'Healthcare')
  }
  if (title.includes('marketing') || title.includes('sales')) {
    relevantIndustries.push('E-commerce', 'Technology', 'Finance')
  }
  if (title.includes('manager') || title.includes('director')) {
    relevantIndustries.push('Technology', 'Healthcare', 'Finance')
  }
  
  // Default industries if no specific match
  if (relevantIndustries.length === 0) {
    relevantIndustries.push('Technology', 'Healthcare', 'E-commerce')
  }
  
  return relevantIndustries.slice(0, 4).map(industry => ({
    name: industry,
    growthRate: INDUSTRY_DATA[industry as keyof typeof INDUSTRY_DATA]?.growthRate || 5.0,
    demandLevel: INDUSTRY_DATA[industry as keyof typeof INDUSTRY_DATA]?.demandLevel || 'Medium',
    averageSalary: INDUSTRY_DATA[industry as keyof typeof INDUSTRY_DATA]?.avgSalary || '$65,000'
  }))
}

function generateRequiredSkills(futureRole: string, currentTitle: string): string[] {
  const role = futureRole.toLowerCase()
  const skills: string[] = []
  
  if (role.includes('senior') || role.includes('lead')) {
    skills.push('Leadership', 'Mentoring', 'Technical Expertise')
  }
  if (role.includes('manager') || role.includes('director')) {
    skills.push('Team Management', 'Strategic Planning', 'Budget Management')
  }
  if (role.includes('vp') || role.includes('chief')) {
    skills.push('Executive Leadership', 'Business Strategy', 'Stakeholder Management')
  }
  if (role.includes('engineer') || role.includes('developer')) {
    skills.push('System Design', 'Code Review', 'Architecture')
  }
  if (role.includes('data') || role.includes('analytics')) {
    skills.push('Advanced Analytics', 'Machine Learning', 'Data Visualization')
  }
  
  return skills.length > 0 ? skills : ['Professional Development', 'Industry Knowledge', 'Communication']
}

export function generateCareerBlurb(
  jobTitle: string, 
  powerScore: number, 
  futureRoles: ForecastResponse['futureRoles'],
  industries: ForecastResponse['industries']
): string {
  const topRole = futureRoles[0]?.role || 'Senior Position'
  const topIndustry = industries[0]?.name || 'Technology'
  const scoreCategory = powerScore >= 80 ? 'exceptional' : powerScore >= 60 ? 'strong' : 'developing'
  
  return `Based on your ${jobTitle} background, you show ${scoreCategory} career potential with a power score of ${powerScore}/100. ` +
    `Your most likely career progression leads to ${topRole} within the next 2-4 years. ` +
    `The ${topIndustry} sector offers the strongest opportunities for your skill set, with ${industries[0]?.growthRate}% projected growth. ` +
    `Focus on developing ${topRole.includes('Manager') || topRole.includes('Director') ? 'leadership and strategic planning' : 'technical expertise and specialization'} skills to accelerate your trajectory. ` +
    `With the current market demand, professionals in your field can expect significant career advancement opportunities.`
}
