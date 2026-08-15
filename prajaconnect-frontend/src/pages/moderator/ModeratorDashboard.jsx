import React from 'react'
import { Link } from 'react-router-dom'
import './ModeratorDashboard.css'

export default function ModeratorDashboard() {
  return (
    <div className="moderator-dashboard page">
      <h1>Moderator dashboard</h1>
      <p className="page-desc">Monitor interactions, ensure respectful communication, and resolve conflicts.</p>
      <div className="dashboard-actions">
        <Link to="/moderator/queue" className="card card-action">
          <span className="card-icon">📋</span>
          <h3>Moderation queue</h3>
          <p>Review reported content and user interactions.</p>
        </Link>
      </div>
      <section>
        <h2>Guidelines</h2>
        <ul className="guidelines-list">
          <li>Review reported posts and comments for policy violations.</li>
          <li>Warn or take action on users who break community standards.</li>
          <li>Mediate disputes and ensure civil discourse.</li>
        </ul>
      </section>
    </div>
  )
}
