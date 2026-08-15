import React from 'react'
import { Link } from 'react-router-dom'
import { useIssues, useUpdates } from '../../hooks/useApi'
import './PoliticianDashboard.css'

export default function PoliticianDashboard() {
  const issues = useIssues()
  const updates = useUpdates()

  return (
    <div className="politician-dashboard page">
      <h1>Politician dashboard</h1>
      <p className="page-desc">Respond to citizen concerns, post updates, and engage in discussions.</p>
      <div className="dashboard-actions">
        <Link to="/politician/post" className="card card-action">
          <span className="card-icon">📢</span>
          <h3>Post an update</h3>
          <p>Share news and updates with citizens.</p>
        </Link>
        <Link to="/politician/concerns" className="card card-action">
          <span className="card-icon">💬</span>
          <h3>Citizen concerns</h3>
          <p>View and respond to reported issues.</p>
        </Link>
      </div>
      <section>
        <h2>Recent concerns</h2>
        {issues.length === 0 ? (
          <p className="empty">No citizen concerns yet.</p>
        ) : (
          <ul className="feed-list">
            {issues.slice(0, 5).map((i) => (
              <li key={i.id} className="feed-item">
                <strong>{i.title}</strong>
                <span className="meta">{i.category} · {i.author} · {i.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Your updates</h2>
        {updates.length === 0 ? (
          <p className="empty">No updates posted yet.</p>
        ) : (
          <ul className="feed-list">
            {updates.slice(0, 3).map((u) => (
              <li key={u.id} className="feed-item">
                <strong>{u.title}</strong>
                <span className="meta">{new Date(u.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
