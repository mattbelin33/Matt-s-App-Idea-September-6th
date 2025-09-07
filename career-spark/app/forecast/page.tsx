import ForecastForm from '../components/ForecastForm'

export default function ForecastPage() {
  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Career Forecast AI
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get personalized career predictions, future role analysis, and industry insights 
            powered by advanced AI algorithms.
          </p>
        </div>
        
        <ForecastForm />
        
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm">Advanced algorithms analyze your job title and LinkedIn profile</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2">Career Mapping</h3>
                <p className="text-sm">Predict future roles, required skills, and career progression paths</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="font-semibold mb-2">Market Insights</h3>
                <p className="text-sm">Industry growth rates, salary ranges, and demand analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
