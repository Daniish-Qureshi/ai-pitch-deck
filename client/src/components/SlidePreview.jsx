import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import axios from 'axios'
import PitchScore from './PitchScore'

const SLIDE_BG_COLORS = [
  '#1d4ed8', '#b91c1c', '#15803d', '#7e22ce', '#c2410c',
  '#0e7490', '#be185d', '#3730a3', '#a16207', '#0f766e',
]

function SlidePreview({ slides, startupName, onBack }) {
  const [current, setCurrent] = useState(0)
  const [downloading, setDownloading] = useState(false)
  const [scoreData, setScoreData] = useState(null)
  const [scoring, setScoring] = useState(false)
  const slideRef = useRef()

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      for (let i = 0; i < slides.length; i++) {
        setCurrent(i)
        await new Promise(resolve => setTimeout(resolve, 900))
        const element = slideRef.current
        const canvas = await html2canvas(element, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: SLIDE_BG_COLORS[i],
        })
        const imgData = canvas.toDataURL('image/jpeg', 0.92)
        if (i > 0) pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight)
      }
      pdf.save(`${startupName}_PitchDeck.pdf`)
    } catch (err) {
      alert('PDF error: ' + err.message)
    } finally {
      setDownloading(false)
      setCurrent(0)
    }
  }

  const handleGetScore = async () => {
    setScoring(true)
    try {
      const res = await axios.post('http://localhost:5000/api/pitch/score', {
        slides,
        startupName
      })
      setScoreData(res.data)
    } catch (err) {
      alert('Score nahi mila — dobara try karo!')
    } finally {
      setScoring(false)
    }
  }

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
          <span className="text-gray-400 text-sm">{current + 1} / {slides.length}</span>
        </div>

        {/* Slide */}
        <div
          ref={slideRef}
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
            <span style={{ color: 'rgba(255,255,255,0.4)' }} className="text-sm">{startupName}</span>
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

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center gap-4">

          {/* PDF Download */}
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-10 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 w-full max-w-sm"
          >
            {downloading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                PDF Ban Raha Hai... ({current + 1}/{slides.length})
              </span>
            ) : '📄 PDF Download Karo'}
          </button>

          {/* Pitch Score */}
          <button
            onClick={handleGetScore}
            disabled={scoring}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-10 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 w-full max-w-sm"
          >
            {scoring ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Score Calculate Ho Raha Hai...
              </span>
            ) : '🎯 AI Pitch Score Dekho'}
          </button>

        </div>

        {/* Score Modal */}
        {scoreData && (
          <PitchScore
            scoreData={scoreData}
            onClose={() => setScoreData(null)}
          />
        )}

      </div>
    </div>
  )
}

export default SlidePreview