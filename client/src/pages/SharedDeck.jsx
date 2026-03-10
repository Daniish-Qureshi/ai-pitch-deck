import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SLIDE_BG_COLORS = [
  '#1d4ed8', '#b91c1c', '#15803d', '#7e22ce', '#c2410c',
  '#0e7490', '#be185d', '#3730a3', '#a16207', '#0f766e',
]

function SharedDeck() {
  const { shareId } = useParams()
  const [deck, setDeck] = useState(null)
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pitch/share/${shareId}`)
        setDeck(res.data)
      } catch (err) {
        alert('Deck nahi mila!')
      } finally {
        setLoading(false)
      }
    }
    fetchDeck()
  }, [shareId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <p className="text-white text-xl">Deck load ho raha hai...</p>
      </div>
    )
  }

  if (!deck) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <p className="text-white text-xl">Deck nahi mila!</p>
      </div>
    )
  }

  const slide = deck.slides[current]

  return (
    <div className="min-h-screen bg-[#0F172A] px-6 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-white font-bold text-lg">PitchAI</span>
          </div>
          <h2 className="text-white font-bold text-lg">{deck.startupName} — Pitch Deck</h2>
          <span className="text-gray-400 text-sm">{current + 1} / {deck.slides.length}</span>
        </div>

        {/* Slide */}
        <div
          style={{ backgroundColor: SLIDE_BG_COLORS[current] }}
          className="rounded-2xl p-10 min-h-[420px] flex flex-col justify-between shadow-2xl"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">{slide.icon}</span>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)' }} className="text-sm uppercase tracking-widest">{slide.title}</p>
                <h2 style={{ color: '#ffffff' }} className="text-3xl font-bold">{slide.heading}</h2>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.85)' }} className="text-lg leading-relaxed mb-6">{slide.content}</p>

            {slide.bulletPoints && slide.bulletPoints.length > 0 && (
              <ul className="space-y-3">
                {slide.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    <span style={{ color: '#ffffff' }} className="mt-1">✦</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-between items-center mt-8">
            <span style={{ color: 'rgba(255,255,255,0.4)' }} className="text-sm">{deck.startupName}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }} className="text-sm">Slide {slide.slideNumber}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-6 py-3 rounded-xl transition"
          >
            ← Pehle
          </button>

          <div className="flex gap-2">
            {deck.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${i === current ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent(Math.min(deck.slides.length - 1, current + 1))}
            disabled={current === deck.slides.length - 1}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-6 py-3 rounded-xl transition"
          >
            Agle →
          </button>
        </div>

        {/* Powered by */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">⚡ Powered by <span className="text-purple-400 font-bold">PitchAI</span></p>
        </div>

      </div>
    </div>
  )
}

export default SharedDeck