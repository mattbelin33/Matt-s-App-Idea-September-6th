export default function LoadingSpinner() {
  return (
    <div className="text-center py-5">
      <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <div className="text-gray-600">Generating your spark...</div>
    </div>
  )
}
