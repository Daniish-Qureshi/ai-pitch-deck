import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import CreatePitch from './pages/CreatePitch'
import SharedDeck from './pages/SharedDeck'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePitch />} />
        <Route path="/deck/:shareId" element={<SharedDeck />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App