interface ActionCardProps {
  icon: string
  title: string
  description: string
  buttonText: string
  onClick: () => void
}

export default function ActionCard({ icon, title, description, buttonText, onClick }: ActionCardProps) {
  return (
    <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 mb-5 text-center card-hover cursor-pointer sm:p-4 sm:mb-4" onClick={onClick}>
      <div className="text-4xl mb-4 sm:text-3xl sm:mb-3">{icon}</div>
      <div className="text-xl font-semibold text-gray-800 mb-3 sm:text-lg sm:mb-2">{title}</div>
      <div className="text-gray-600 text-sm leading-relaxed mb-4 sm:text-xs sm:mb-3">{description}</div>
      <button className="btn-primary w-full text-base sm:text-sm sm:py-2">
        {buttonText}
      </button>
    </div>
  )
}
