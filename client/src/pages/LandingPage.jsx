import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <Hero />
      <Features />
    </div>
  )
}

export default LandingPage