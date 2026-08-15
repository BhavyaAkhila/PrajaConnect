import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import IssueConversation from '../../components/IssueConversation'
import { useAuth } from '../../context/AuthContext'
import { addIssueReplyAPI, useIssues } from '../../hooks/useApi'
import './MyReports.css'

export default function MyReports() {
  const { user } = useAuth()
  const [refreshKey, setRefreshKey] = useState(0)
  const issues = useIssues(refreshKey).filter((issue) => issue.author === user?.name)

  const handleReply = async (issueId, message) => {
    await addIssueReplyAPI(issueId, message, user?.jwt)
    setRefreshKey((value) => value + 1)
  }

  return (
    <div className="my-reports page">
      <h1>My reports</h1>
      <p className="page-desc">Track each issue, see replies from representatives, and add follow-ups.</p>
      <Link to="/citizen/report" className="btn btn-primary" style={{ marginBottom: '1rem' }}>New report</Link>
      {issues.length === 0 ? (
        <p className="empty">You haven't submitted any reports yet. <Link to="/citizen/report">Report an issue</Link>.</p>
      ) : (
        <ul className="reports-list">
          {issues.map((issue) => (
            <li key={issue.id} className="report-card">
              <IssueConversation
                issue={issue}
                currentUser={user}
                onReply={handleReply}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
