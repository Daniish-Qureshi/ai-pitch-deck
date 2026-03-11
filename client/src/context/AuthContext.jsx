import { createContext, useState, useContext } from 'react'
import axios from 'axios'

// const AuthContext = createContext()

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  )

  const register = async (name, email, password) => {
    const res = await axios.post('https://ai-pitch-deck-ajbt.onrender.com/api/auth/register', {
      name, email, password
    })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    setToken(res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const login = async (email, password) => {
    const res = await axios.post('https://ai-pitch-deck-ajbt.onrender.com/api/auth/login', {
      email, password
    })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    setToken(res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}