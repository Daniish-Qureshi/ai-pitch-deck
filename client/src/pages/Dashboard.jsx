import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-white font-bold text-xl">PitchAI</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white border border-white/20 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <span className="text-5xl">👋</span>
          <h1 className="text-white text-3xl font-bold mt-4">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-400 mt-2">
            Tera dashboard ready hai — ab pitch deck banao!
          </p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition">
            🚀 Naya Pitch Deck Banao
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard