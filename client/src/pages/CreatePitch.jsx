import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import SlidePreview from '../components/SlidePreview'

function CreatePitch() {
  const { token } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [slides, setSlides] = useState(null)
  const [formData, setFormData] = useState({
    startupName: '',
    idea: '',
    targetAudience: '',
    businessModel: '',
    usp: '',
    fundingGoal: '',
    industry: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await axios.post('https://ai-pitch-deck-ajbt.onrender.com/api/pitch/generate', formData)
      setSlides(res.data.slides)
      setStep(2)
    } catch (err) {
      alert('Kuch galat ho gaya! Dobara try karo.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 2 && slides) {
    return <SlidePreview slides={slides} startupName={formData.startupName} onBack={() => setStep(1)} />
  }

  return (
    <div className="min-h-screen bg-[#0F172A] px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl">🚀</span>
          <h1 className="text-white text-3xl font-bold mt-4">Apna Pitch Deck Banao</h1>
          <p className="text-gray-400 mt-2">Neeche details bharo — AI baaki kaam karega!</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">

          <div>
            <label className="text-gray-400 text-sm mb-2 block">🏢 Startup Ka Naam *</label>
            <input
              name="startupName"
              value={formData.startupName}
              onChange={handleChange}
              placeholder="jaise: TiffinWala, QuickFix, StudyBuddy"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">💡 Tumhara Idea Kya Hai? *</label>
            <textarea
              name="idea"
              value={formData.idea}
              onChange={handleChange}
              placeholder="jaise: Jaipur ke office workers ke liye healthy tiffin delivery service"
              rows={3}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition resize-none"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">🎯 Target Customer Kaun Hai? *</label>
            <input
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="jaise: 22-35 saal ke Jaipur ke office workers"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">💰 Paise Kaise Kamaoge? *</label>
            <input
              name="businessModel"
              value={formData.businessModel}
              onChange={handleChange}
              placeholder="jaise: Monthly subscription Rs. 2000/month"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">⭐ Tumhara USP Kya Hai? *</label>
            <input
              name="usp"
              value={formData.usp}
              onChange={handleChange}
              placeholder="jaise: 30 min mein delivery, ghar jaisa khana"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">🏭 Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full bg-[#1E293B] border border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              >
                <option value="">Select karo</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="EdTech">EdTech</option>
                <option value="FinTech">FinTech</option>
                <option value="HealthTech">HealthTech</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="SaaS">SaaS</option>
                <option value="AgriTech">AgriTech</option>
                <option value="Logistics">Logistics</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">📈 Funding Goal *</label>
              <input
                name="fundingGoal"
                value={formData.fundingGoal}
                onChange={handleChange}
                placeholder="jaise: Rs. 50 Lakhs"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !formData.startupName || !formData.idea}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition transform hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                AI Pitch Deck Bana Raha Hai...
              </span>
            ) : '🚀 Pitch Deck Generate Karo!'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default CreatePitch