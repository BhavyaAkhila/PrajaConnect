import React from 'react'
import { Link } from 'react-router-dom'
import { useIssues, useUpdates, useUsers } from '../../hooks/useApi'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const issues = useIssues()
  const updates = useUpdates()
  const users = useUsers()
  const openIssues = issues.filter((issue) => issue.status !== 'RESOLVED').length

  return (
    <div className="admin-dashboard page">
      <h1>Admin dashboard</h1>
      <p className="page-desc">Oversee platform operations, review live activity, and keep the service organized.</p>
      <div className="dashboard-actions">
        <Link to="/admin/users" className="card card-action">
          <span className="card-icon">Users</span>
          <h3>User management</h3>
          <p>Review registered accounts, contact details, and role coverage.</p>
        </Link>
        <Link to="/moderator/queue" className="card card-action">
          <span className="card-icon">Queue</span>
          <h3>Moderation queue</h3>
          <p>Track active issue conversations and keep responses moving.</p>
        </Link>
      </div>
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{users.length}</span>
          <span className="stat-label">Registered users</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{issues.length}</span>
          <span className="stat-label">Issues reported</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{updates.length}</span>
          <span className="stat-label">Politician updates</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{openIssues}</span>
          <span className="stat-label">Open issues</span>
        </div>
      </section>
    </div>
  )
}
