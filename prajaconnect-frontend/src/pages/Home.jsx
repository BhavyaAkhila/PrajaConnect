import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import IndianFlag from '../components/IndianFlag'
import './Home.css'

const ROLES_SLIDES = [
  {
    id: 'citizen',
    title: 'Citizen',
    image: 'https://thumbs.dreamstime.com/b/puttaparthi-andhra-pradesh-india-july-portrait-elderly-indian-woman-copy-space-text-close-up-puttaparthi-andhra-pradesh-99145090.jpg',
    desc: 'Report issues, provide feedback, and receive updates from your representatives.',
  },
  {
    id: 'politician',
    title: 'Politician',
    image: 'https://assets.weforum.org/sf_account/image/9pEtECWKSlVX4sl7imE-3K_b1z-wMXI0kmYoWL4XeHA.jpeg',
    desc: 'Respond to citizen concerns, post updates, and engage in discussions.',
  },
  {
    id: 'moderator',
    title: 'Moderator',
    icon: '🛡️',
    desc: 'Monitor interactions, ensure respectful communication, and resolve conflicts.',
  },
  {
    id: 'admin',
    title: 'Admin',
    icon: '⚙️',
    desc: 'Oversee platform operations, manage user roles, and ensure data integrity.',
  },
]

const INDIA_IMAGES = [
  { src: 'https://static.wixstatic.com/media/2d34e5_6f0fa974736b428f91feb26b5a558ade~mv2.jpg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2d34e5_6f0fa974736b428f91feb26b5a558ade~mv2.jpg', alt: 'Coastal India – citizens and public spaces', caption: 'Citizens at the heart of democracy' },
  { src: 'https://c.ndtvimg.com/2024-06/rgpq6dm8_chandrababu-naidu_640x480_04_June_24.jpg', alt: 'Indian politicians and representatives', caption: 'Transparent participation in governance' },
  { src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600', alt: 'Heritage and unity', caption: 'Connecting people with power — across India' },
]

const STATS = [
  { label: 'Issues Reported', value: 0, icon: '📋' },
  { label: 'Issues Resolved', value: 0, icon: '✓' },
  { label: 'Active Citizens', value: 0, icon: '👥' },
  { label: 'Representatives Connected', value: 0, icon: '🤝' },
]

const FEATURES = [
  { icon: '📝', title: 'Report civic issues easily', desc: 'Submit issues with categories and descriptions in a few clicks.' },
  { icon: '📊', title: 'Track complaint status in real time', desc: 'See updates on your reports as they are reviewed and acted upon.' },
  { icon: '💬', title: 'Direct communication with representatives', desc: 'Engage in transparent dialogue with your elected representatives.' },
  { icon: '📢', title: 'Receive official updates', desc: 'Get timely updates and announcements from your representatives.' },
]

function AnimatedCount({ end, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = 0
          const startTime = performance.now()
          const step = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.floor(start + (end - start) * progress))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % ROLES_SLIDES.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const { user } = useAuth()

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero hero-india hero-enhanced">
        <div className="hero-bg-pattern" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title hero-title-in">PrajaConnect</h1>
          <p className="hero-lead hero-lead-in">
            Connecting People with Power — Transparently.
          </p>
          {!user ? (
            <div className="hero-cta hero-cta-in">
              <IndianFlag className="hero-cta-flag" width={28} height={20} />
              <Link to="/login" className="btn btn-primary btn-lg btn-enhanced">Get started</Link>
            </div>
          ) : (
            <div className="hero-dashboard-links hero-cta-in">
              <Link to={`/${user.role}`} className="btn btn-primary btn-enhanced">Go to my dashboard</Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats strip */}
      <section className="stats-strip">
        <div className="stats-strip-inner">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value"><AnimatedCount end={stat.value} /></span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Role carousel */}
      <section className="roles-slider-section section-in">
        <div className="roles-slider">
          <button
            type="button"
            className="slider-arrow slider-prev"
            onClick={() => setSlideIndex((i) => (i - 1 + ROLES_SLIDES.length) % ROLES_SLIDES.length)}
            aria-label="Previous"
          >
            ‹
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
                    {slide.image ? (
                      <div className="slider-image-wrap">
                        <img src={slide.image} alt={slide.title} className="slider-role-image" />
                      </div>
                    ) : (
                      <span className="slider-icon">{slide.icon}</span>
                    )}
                    <h3>{slide.title}</h3>
                    <p>{slide.desc}</p>
                    {!user && (
                      <Link to="/login" className="btn btn-primary btn-sm btn-enhanced">Sign in as {slide.title}</Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="slider-arrow slider-next"
            onClick={() => setSlideIndex((i) => (i + 1) % ROLES_SLIDES.length)}
            aria-label="Next"
          >
            ›
          </button>
        </div>
        <div className="slider-dots">
          {ROLES_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === slideIndex ? 'active' : ''}`}
              onClick={() => setSlideIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Connecting India */}
      <section className="india-section section-in">
        <h2>Connecting India</h2>
        <p className="india-section-lead">
          Bridging citizens and representatives for transparent governance.
        </p>
        <div className="india-gallery">
          {INDIA_IMAGES.map((img) => (
            <div key={img.caption} className="india-gallery-item">
              <div className="india-gallery-img-wrap">
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="india-gallery-overlay" />
              </div>
              <p className="india-gallery-caption">{img.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature highlights */}
      <section className="features-section section-in">
        <h2>How PrajaConnect Helps You</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
