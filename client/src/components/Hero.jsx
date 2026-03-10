function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm mb-8">
          <span>✨</span>
          <span>India ka pehla AI Pitch Deck Generator</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Apna Business Idea{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Investor-Ready
          </span>{' '}
          Banao
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Sirf apna idea type karo — AI 2 minute mein poori 
          10-slide presentation bana dega. Free. Fast. Professional.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105">
            🚀 Free mein Banao
          </button>
          <button className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl text-lg font-semibold transition">
            ▶ Demo Dekho
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl font-bold text-white">2 min</div>
            <div className="text-gray-500 text-sm">Mein ready</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">10</div>
            <div className="text-gray-500 text-sm">Slides auto</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-gray-500 text-sm">Free hai</div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero