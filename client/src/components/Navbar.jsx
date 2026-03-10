import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="text-white font-bold text-xl">PitchAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white transition">Features</a>
          <a href="#how" className="text-gray-400 hover:text-white transition">How it Works</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-gray-400 hover:text-white transition px-4 py-2">
            Login
          </Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition">
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar