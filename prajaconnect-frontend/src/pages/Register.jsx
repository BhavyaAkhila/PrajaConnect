import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IndianFlag from '../components/IndianFlag'
import { API_BASE_URL } from '../config/api'
import './Login.css'

const ROLES_SLIDES = [
  {
    id: 'citizen',
    label: 'Citizen',
    image: 'https://thumbs.dreamstime.com/b/puttaparthi-andhra-pradesh-india-july-portrait-elderly-indian-woman-copy-space-text-close-up-puttaparthi-andhra-pradesh-99145090.jpg',
    desc: 'Report issues, give feedback, and follow updates from your area.',
  },
  {
    id: 'politician',
    label: 'Politician',
    image: 'https://assets.weforum.org/sf_account/image/9pEtECWKSlVX4sl7imE-3K_b1z-wMXI0kmYoWL4XeHA.jpeg',
    desc: 'Respond to concerns, share progress, and stay accountable publicly.',
  },
]

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    role: 'citizen'
  })
  const [slideIndex, setSlideIndex] = useState(0)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          role: formData.role,
          phone: formData.phone.trim(),
          location: formData.location.trim()
        })
      })

      if (res.ok) {
        alert('Registration successful. Please sign in with your email and password.')
        navigate('/login')
      } else {
        const errorData = await res.json()
        alert(errorData.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      console.error('Registration Error:', err)
      alert('Error connecting to server. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSlideChange = (index) => {
    setSlideIndex(index)
    setFormData((prev) => ({
      ...prev,
      role: ROLES_SLIDES[index].id
    }))
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-flag-wrap">
          <IndianFlag width={48} height={32} />
        </div>
        <h1 className="login-title">Join PrajaConnect</h1>
        <p className="login-subtitle">Create your account to connect with your community.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Full name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              autoFocus
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </label>

          <label>
            Email address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password (min. 6 characters)"
              required
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </label>

          <label>
            Phone number
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your 10-digit phone number"
              required
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </label>

          <label>
            Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter your city or location"
              required
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </label>

          <div className="role-slider-section">
            <label className="role-slider-label">Choose your account type</label>
            <div className="role-slider">
              <button
                type="button"
                className="slider-arrow slider-prev"
                onClick={() => handleSlideChange((slideIndex - 1 + ROLES_SLIDES.length) % ROLES_SLIDES.length)}
                aria-label="Previous"
              >
                Prev
              </button>
              <div className="slider-track">
                <div
                  className="slider-track-inner"
                  style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                >
                  {ROLES_SLIDES.map((slide, i) => (
                    <div
                      key={slide.id}
                      className={`slider-slide ${i === slideIndex ? 'slider-slide-active' : ''}`}
                    >
                      <div className="slider-slide-inner">
                        <div className="slider-image-wrap">
                          <img src={slide.image} alt={slide.label} className="slider-role-image" />
                        </div>
                        <h3>{slide.label}</h3>
                        <p>{slide.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="slider-arrow slider-next"
                onClick={() => handleSlideChange((slideIndex + 1) % ROLES_SLIDES.length)}
                aria-label="Next"
              >
                Next
              </button>
            </div>
            <div className="slider-dots">
              {ROLES_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`dot ${i === slideIndex ? 'active' : ''}`}
                  onClick={() => handleSlideChange(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : `Sign up as ${ROLES_SLIDES[slideIndex].label}`}
          </button>

          <div className="login-footer" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Already have an account? <a href="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
