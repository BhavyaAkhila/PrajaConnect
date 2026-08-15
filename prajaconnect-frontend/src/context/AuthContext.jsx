import React, { createContext, useContext, useState } from 'react'
import { API_BASE_URL } from '../config/api'

const AuthContext = createContext(null)

const ROLES = { admin: 'Admin', citizen: 'Citizen', politician: 'Politician', moderator: 'Moderator' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fsad08_user')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return null
      }
    }
    return null
  })

  const login = async (email, password) => {
    const readJsonSafely = async (res) => {
      const text = await res.text()
      if (!text) return null
      try {
        return JSON.parse(text)
      } catch {
        return { message: text }
      }
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        })
      })

      if (!res.ok) {
        const loginError = await readJsonSafely(res)
        const message = loginError?.message || 'Login failed. Please check your email and password.'
        alert(message)
        return false
      }

      const data = await readJsonSafely(res)
      if (!data?.token || !data?.role) {
        alert('Login failed. Invalid response from server.')
        return false
      }

      const nextUser = {
        name: data.name,
        email: data.email,
        role: data.role.toLowerCase(),
        id: data.id,
        jwt: data.token,
      }

      setUser(nextUser)
      localStorage.setItem('fsad08_user', JSON.stringify(nextUser))
      return true
    } catch (err) {
      console.error('Backend Error:', err)
      alert('Unable to reach the server right now. Please try again in a moment.')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fsad08_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ROLES }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
