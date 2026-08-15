import React from 'react'
import { Link } from 'react-router-dom'
import { useIssues, useUpdates } from '../../hooks/useApi'
import './CitizenDashboard.css'

export default function CitizenDashboard() {
  const issues = useIssues()
  const updates = useUpdates()

  return (
    <div className="citizen-dashboard page">
      <h1>Citizen dashboard</h1>
      <p className="page-desc">Report issues, give feedback, and stay updated.</p>
      <div className="dashboard-actions">
        <Link to="/citizen/report" className="card card-action">
          <span className="card-icon">📝</span>
          <h3>Report an issue</h3>
          <p>Submit a new issue or feedback for your representatives.</p>
        </Link>
        <Link to="/citizen/reports" className="card card-action">
          <span className="card-icon">📋</span>
          <h3>My reports</h3>
          <p>View and track your submitted reports.</p>
        </Link>
      </div>
      <section className="updates-feed">
        <h2>Updates from politicians</h2>
        {updates.length === 0 ? (
          <p className="empty">No updates yet.</p>
        ) : (
          <ul className="feed-list">
            {updates.slice(0, 5).map((u) => (
              <li key={u.id} className="feed-item">
                <strong>{u.title}</strong>
                <span className="meta">{u.author} · {new Date(u.createdAt).toLocaleDateString()}</span>
                <p>{u.body?.slice(0, 120)}…</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Recent issues</h2>
        {issues.length === 0 ? (
          <p className="empty">No issues reported yet.</p>
        ) : (
          <ul className="feed-list">
            {issues.slice(0, 5).map((i) => (
              <li key={i.id} className="feed-item">
                <strong>{i.title}</strong>
                <span className="meta">{i.category} · {i.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
