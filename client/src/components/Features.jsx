const features = [
  {
    icon: "🤖",
    title: "AI-Powered",
    desc: "Claude AI se powered — sirf idea batao, baaki AI sambhal lega"
  },
  {
    icon: "🇮🇳",
    title: "Indian Context",
    desc: "Indian market data, INR projections, aur local funding schemes"
  },
  {
    icon: "📊",
    title: "10 Slides Auto",
    desc: "Problem, Solution, Market, Revenue — sab slides automatically banti hain"
  },
  {
    icon: "📄",
    title: "PDF Download",
    desc: "Ek click mein professional PDF download karo aur share karo"
  },
  {
    icon: "✏️",
    title: "Edit Karo",
    desc: "AI ke content ko apne hisaab se edit aur customize karo"
  },
  {
    icon: "📈",
    title: "Pitch Score",
    desc: "AI batayega teri deck kitni strong hai aur kya improve karna hai"
  },
]

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kyu choose karein <span className="text-blue-400">PitchAI?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Dusre tools se alag — Indian founders ke liye banaya gaya
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Features