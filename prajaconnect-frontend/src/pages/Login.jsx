import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import IndianFlag from '../components/IndianFlag'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    setIsLoading(true)
    const ok = await login(email.trim(), password)
    setIsLoading(false)

    if (ok) navigate('/')
  }

  return (
    <div className="login-page">
      <div className="login-card" role="main">
        <div className="login-flag-wrap">
          <IndianFlag width={48} height={32} />
        </div>
        <h1 className="login-title">PrajaConnect</h1>
        <p className="login-subtitle">Sign in to track issues, publish updates, and keep conversations moving.</p>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              autoFocus
              aria-label="Email address"
            />
          </label>

          <label>
            Password
            <div className="input-with-toggle">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                aria-label="Password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setPasswordVisible((v) => !v)}
                aria-pressed={passwordVisible}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                <span className="visually-hidden">Signing in...</span>
                Signing in...
              </>
            ) : 'Sign in'}
          </button>

          <div className="login-footer" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Do not have an account? <a href="/register" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
