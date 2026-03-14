const features = [
  { icon: "⚡", title: "2 Minute Mein Ready", desc: "Sirf idea type karo — AI baaki sab automatically generate kar deta hai" },
  { icon: "🇮🇳", title: "Indian Context", desc: "INR projections, local market data, aur Indian govt funding schemes" },
  { icon: "🎯", title: "AI Pitch Score", desc: "8-category evaluation — grade, feedback, aur investor verdict" },
  { icon: "🎨", title: "6 Templates", desc: "Professional color themes — Default, Ocean, Sunset, Forest, Galaxy, Fire" },
  { icon: "✏️", title: "Edit Karo", desc: "AI content ko manually edit karo — heading, content, bullet points" },
  { icon: "📤", title: "PDF & PPTX Export", desc: "Ek click mein PDF ya PowerPoint download karo" },
]

const steps = [
  { num: "01", icon: "📝", title: "Details Bharo", desc: "Startup naam, idea, audience, aur funding goal — bas 2 minute ka form" },
  { num: "02", icon: "🤖", title: "AI Generate Karta Hai", desc: "Groq AI (Llama 3.3 70B) tumhara idea samajh ke 10 professional slides banata hai" },
  { num: "03", icon: "✨", title: "Customize Karo", desc: "Template choose karo, slides edit karo, AI pitch score dekho" },
  { num: "04", icon: "🚀", title: "Share Karo", desc: "PDF/PPTX download karo ya shareable link se investors ko bhejo" },
]

function Features() {
  return (
    <>
      {/* Features */}
      <section id="features" className="py-32 px-6 bg-[#050810]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-20">
            <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
              Sab kuch ek jagah
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Indian founders ke liye specifically design kiya gaya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i}
                className="group p-7 rounded-2xl border border-white/6 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/12 transition-all duration-300 cursor-default">
                <div className="text-3xl mb-5">{f.icon}</div>
                <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 relative overflow-hidden"
        style={{background: 'linear-gradient(180deg, #050810 0%, #070c18 100%)'}}>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">How it Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
              4 steps, 2 minutes
            </h2>
            <p className="text-gray-500 text-lg">Itna simple hai</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <div key={i}
                className="relative p-8 rounded-2xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 overflow-hidden group">
                <div className="absolute top-5 right-6 text-7xl font-black text-white/[0.04] group-hover:text-white/[0.07] transition select-none">
                  {s.num}
                </div>
                <div className="text-3xl mb-5">{s.icon}</div>
                <p className="text-blue-400/80 text-xs font-medium tracking-widest uppercase mb-2">Step {s.num}</p>
                <h3 className="text-white font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="/register"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg shadow-white/10">
              🚀 Abhi Shuru Karo — Free Mein
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Features