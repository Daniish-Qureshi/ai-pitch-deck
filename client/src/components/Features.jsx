const features = [
  { icon: "🤖", title: "AI-Powered", desc: "Groq AI se powered — sirf idea batao, baaki AI sambhal lega" },
  { icon: "🇮🇳", title: "Indian Context", desc: "Indian market data, INR projections, aur local funding schemes" },
  { icon: "📊", title: "10 Slides Auto", desc: "Problem, Solution, Market, Revenue — sab slides automatically banti hain" },
  { icon: "📄", title: "PDF Download", desc: "Ek click mein professional PDF download karo aur share karo" },
  { icon: "✏️", title: "Edit Karo", desc: "AI ke content ko apne hisaab se edit aur customize karo" },
  { icon: "📈", title: "Pitch Score", desc: "AI batayega teri deck kitni strong hai aur kya improve karna hai" },
]

const steps = [
  { step: "01", icon: "📝", title: "Apna Idea Likho", desc: "Startup ka naam, idea, target audience, aur funding goal fill karo — sirf 2 minute ka kaam" },
  { step: "02", icon: "🤖", title: "AI Deck Banata Hai", desc: "Groq AI tumhara idea samjhta hai aur 10 professional slides automatically generate karta hai" },
  { step: "03", icon: "✏️", title: "Edit aur Customize Karo", desc: "AI ke content ko apne hisaab se edit karo, template choose karo, aur pitch score dekho" },
  { step: "04", icon: "🚀", title: "Share aur Download Karo", desc: "PDF ya PPTX download karo, ya shareable link se investors ko directly bhejo" },
]

function Features() {
  return (
    <>
      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kyu choose karein <span className="text-blue-400">PitchAI?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Dusre tools se alag — Indian founders ke liye banaya gaya
            </p>
          </div>
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

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-white/2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kaise kaam karta hai <span className="text-blue-400">PitchAI?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              4 simple steps mein apna investor-ready pitch deck banao
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl font-black text-white/5">
                  {s.step}
                </div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-blue-400 text-sm font-semibold mb-2">STEP {s.step}</div>
                <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Bottom */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6 text-lg">Abhi try karo — bilkul free hai!</p>
            
             <a
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105 inline-block"
            >
              🚀 Abhi Shuru Karo — Free Mein
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Features