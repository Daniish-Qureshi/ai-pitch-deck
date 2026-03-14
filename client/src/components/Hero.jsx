import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const [showDemo, setShowDemo] = useState(false)
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">

      {/* Background effects */}
      <div className="absolute inset-0 bg-[#050810]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-500/6 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px'}} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm text-gray-300 px-5 py-2 rounded-full text-sm mb-10 hover:border-white/20 transition">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span>India ka AI Pitch Deck Generator</span>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.05]">
          <span className="text-white">Apna Idea</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
            Investor-Ready
          </span>
          <br />
          <span className="text-white">Banao</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-light">
          Sirf idea type karo — AI 2 minute mein poori 10-slide
          professional presentation bana dega. Free.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-20">
          <button
            onClick={() => navigate('/register')}
            className="group relative bg-white text-black px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:bg-gray-100 hover:scale-105 shadow-lg shadow-white/10"
          >
            <span className="flex items-center justify-center gap-2">
              🚀 Free mein Banao
            </span>
          </button>
          <button
            onClick={() => setShowDemo(true)}
            className="group border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all"
          >
            ▶ Demo Dekho
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12">
          {[
            { value: '2 min', label: 'Mein ready' },
            { value: '10', label: 'Slides auto' },
            { value: '100%', label: 'Free hai' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDemo(false)}>
          <div className="bg-[#0f1117] border border-white/10 rounded-3xl p-5 w-full max-w-3xl shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">🎬 PitchAI Demo</h3>
              <button onClick={() => setShowDemo(false)}
                className="text-gray-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition">✕</button>
            </div>
            <video controls autoPlay className="w-full rounded-2xl bg-black" style={{ maxHeight: '70vh' }}>
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

    </section>
  )
}

export default Hero