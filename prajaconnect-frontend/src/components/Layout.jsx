import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import IndianFlag from './IndianFlag'
import './Layout.css'

export default function Layout() {
  const { user, logout, ROLES } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMenuOpen(false)
  }

  const roleLinks = {
    citizen: [
      { to: '/citizen', label: 'Dashboard' },
      { to: '/citizen/report', label: 'Report issue' },
      { to: '/citizen/reports', label: 'My reports' },
    ],
    politician: [
      { to: '/politician', label: 'Dashboard' },
      { to: '/politician/post', label: 'Post update' },
      { to: '/politician/concerns', label: 'Citizen concerns' },
    ],
    admin: [
      { to: '/admin', label: 'Dashboard' },
      { to: '/admin/users', label: 'User management' },
    ],
    moderator: [
      { to: '/moderator', label: 'Dashboard' },
      { to: '/moderator/queue', label: 'Moderation queue' },
    ],
  }

  const links = user ? roleLinks[user.role] || [] : []

  return (
    <div className="layout">
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <NavLink to="/" className="logo">
          <IndianFlag className="logo-flag" width={36} height={24} />
          <span className="logo-text">PrajaConnect</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          {user && links.map(({ to, label }) => (
            <NavLink key={to} to={to} className="nav-link" onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          {user ? (
            <>
              <span className="role-chip">{ROLES[user.role]}</span>
              <span className="user-name">{user.name}</span>
              <button className="btn btn-ghost" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-primary">Log in</NavLink>
          )}
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-nav">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</NavLink>
          ))}
        </div>
      )}
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer footer-enhanced">
        <div className="footer-brand">PrajaConnect</div>
        <p className="footer-desc">Bridging citizens and representatives for transparent governance across India.</p>
      </footer>
    </div>
  )
}
