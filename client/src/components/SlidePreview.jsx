import { useState } from 'react'

const SLIDE_COLORS = [
  'from-blue-600 to-blue-800',
  'from-red-600 to-red-800',
  'from-green-600 to-green-800',
  'from-purple-600 to-purple-800',
  'from-orange-600 to-orange-800',
  'from-cyan-600 to-cyan-800',
  'from-pink-600 to-pink-800',
  'from-indigo-600 to-indigo-800',
  'from-yellow-600 to-yellow-800',
  'from-teal-600 to-teal-800',
]

function SlidePreview({ slides, startupName, onBack }) {
  const [current, setCurrent] = useState(0)

  const slide = slides[current]

  return (
    <div className="min-h-screen bg-[#0F172A] px-6 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white border border-white/20 px-4 py-2 rounded-lg transition"
          >
            ← Wapas Jao
          </button>
          <h2 className="text-white font-bold text-lg">{startupName} — Pitch Deck</h2>
          <span className="text-gray-400 text-sm">
            {current + 1} / {slides.length}
          </span>
        </div>

        {/* Slide */}
        <div className={`bg-gradient-to-br ${SLIDE_COLORS[current]} rounded-2xl p-10 min-h-[420px] flex flex-col justify-between shadow-2xl`}>

          {/* Slide Header */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">{slide.icon}</span>
              <div>
                <p className="text-white/60 text-sm uppercase tracking-widest">{slide.title}</p>
                <h2 className="text-white text-3xl font-bold">{slide.heading}</h2>
              </div>
            </div>

            {/* Content */}
            <p className="text-white/80 text-lg leading-relaxed mb-6">{slide.content}</p>

            {/* Bullet Points */}
            {slide.bulletPoints && slide.bulletPoints.length > 0 && (
              <ul className="space-y-3">
                {slide.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <span className="text-white mt-1">✦</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Slide Number */}
          <div className="flex justify-end">
            <span className="text-white/30 text-sm">Slide {slide.slideNumber}</span>
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

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${i === current ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
            disabled={current === slides.length - 1}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-6 py-3 rounded-xl transition"
          >
            Agle →
          </button>
        </div>

      </div>
    </div>
  )
}

export default SlidePreview