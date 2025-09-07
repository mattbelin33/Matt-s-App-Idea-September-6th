interface ResultCardProps {
  content: string
  onShare: () => void
  onNewSpark: () => void
}

export default function ResultCard({ content, onShare, onNewSpark }: ResultCardProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 mt-5 animate-fade-in">
      <div className="text-lg leading-relaxed mb-5">{content}</div>
      <div className="flex gap-3">
        <button
          onClick={onShare}
          className="bg-white/20 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 hover:bg-white/30 hover:border-white/50"
        >
          📱 Share on LinkedIn
        </button>
        <button
          onClick={onNewSpark}
          className="bg-white/20 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 hover:bg-white/30 hover:border-white/50"
        >
          ⚡ New Spark
        </button>
      </div>
    </div>
  )
}
