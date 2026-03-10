function PitchScore({ scoreData, onClose }) {
  const getColor = (score, max) => {
    const pct = (score / max) * 100
    if (pct >= 80) return '#22c55e'
    if (pct >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-400'
    if (grade.startsWith('B')) return 'text-blue-400'
    if (grade.startsWith('C')) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getVerdictColor = (verdict) => {
    if (verdict?.includes('Would invest')) return 'bg-green-500/20 border-green-500/30 text-green-400'
    if (verdict?.includes('Needs')) return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
    return 'bg-red-500/20 border-red-500/30 text-red-400'
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 mb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-bold">🎯 AI Pitch Score</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white border border-white/20 px-4 py-2 rounded-lg"
            >
              ✕ Band Karo
            </button>
          </div>

          {/* Total Score */}
          <div className="text-center mb-6">
            <div className={`text-8xl font-bold ${getGradeColor(scoreData.grade)}`}>
              {scoreData.grade}
            </div>
            <div className="text-white text-3xl font-bold mt-2">
              {scoreData.totalScore} / 100
            </div>
            <p className="text-gray-400 mt-3 text-lg">{scoreData.summary}</p>
          </div>

          {/* Investor Verdict */}
          <div className={`border rounded-xl px-6 py-4 text-center font-semibold ${getVerdictColor(scoreData.investorVerdict)}`}>
            👨‍💼 Investor Verdict: {scoreData.investorVerdict}
          </div>
        </div>

        {/* Category Scores */}
        <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 mb-4">
          <h3 className="text-white font-bold text-lg mb-6">📊 Category Breakdown</h3>
          <div className="space-y-4">
            {scoreData.categories?.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300 text-sm">{cat.name}</span>
                  <span className="text-white font-bold text-sm">{cat.score}/{cat.maxScore}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(cat.score / cat.maxScore) * 100}%`,
                      backgroundColor: getColor(cat.score, cat.maxScore)
                    }}
                  />
                </div>
                <p className="text-gray-500 text-xs">{cat.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
            <h3 className="text-green-400 font-bold mb-4">✅ Strengths</h3>
            <ul className="space-y-2">
              {scoreData.strengths?.map((s, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-green-400">✦</span>{s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-red-400 font-bold mb-4">🔧 Improve Karo</h3>
            <ul className="space-y-2">
              {scoreData.improvements?.map((imp, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-red-400">✦</span>{imp}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PitchScore