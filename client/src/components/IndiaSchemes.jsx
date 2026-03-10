import { useState } from 'react'
import axios from 'axios'

function IndiaSchemes({ industry, fundingGoal, businessModel }) {
  const [schemes, setSchemes] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchSchemes = async () => {
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/pitch/india-schemes', {
        industry,
        fundingGoal,
        businessModel
      })
      setSchemes(res.data.schemes)
    } catch (err) {
      alert('Schemes nahi mili — dobara try karo!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6">
      {!schemes && (
        <button
          onClick={fetchSchemes}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg transition transform hover:scale-105"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Schemes Dhoondh Raha Hai...
            </span>
          ) : '🇮🇳 Indian Govt Schemes Dekho'}
        </button>
      )}

      {schemes && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">🇮🇳 Tumhare Liye Government Schemes</h3>
            <button
              onClick={() => setSchemes(null)}
              className="text-gray-400 hover:text-white text-sm border border-white/20 px-3 py-1 rounded-lg"
            >
              ✕ Band Karo
            </button>
          </div>

          <div className="space-y-4">
            {schemes.map((scheme, i) => (
              <div key={i} className="bg-white/5 border border-orange-500/20 rounded-xl p-5 hover:bg-white/10 transition">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{scheme.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-bold">{scheme.name}</h4>
                      <span className="text-orange-400 font-bold text-sm">{scheme.amount}</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">🏛️ {scheme.ministry}</p>
                    <p className="text-gray-300 text-sm mb-2">{scheme.benefit}</p>
                    <p className="text-gray-500 text-xs mb-3">✅ Eligibility: {scheme.eligibility}</p>
                    
                     <a href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 text-xs underline"
                    >
                      🔗 Official Website →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default IndiaSchemes 