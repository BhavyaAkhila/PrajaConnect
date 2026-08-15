import React, { useState } from 'react'
import IssueConversation from '../../components/IssueConversation'
import { useAuth } from '../../context/AuthContext'
import { addIssueReplyAPI, updateIssueStatusAPI, useIssues } from '../../hooks/useApi'
import './Concerns.css'

export default function Concerns() {
  const [refreshKey, setRefreshKey] = useState(0)
  const issues = useIssues(refreshKey)
  const { user } = useAuth()

  const refresh = () => setRefreshKey((value) => value + 1)

  const handleReply = async (issueId, message) => {
    await addIssueReplyAPI(issueId, message, user?.jwt)
    refresh()
  }

  const handleStatusChange = async (issueId, status) => {
    await updateIssueStatusAPI(issueId, status, user?.jwt)
    refresh()
  }

  return (
    <div className="concerns page">
      <h1>Citizen concerns</h1>
      <p className="page-desc">View concerns, update their status, and keep the conversation transparent.</p>
      {issues.length === 0 ? (
        <p className="empty">No concerns reported yet.</p>
      ) : (
        <ul className="concerns-list">
          {issues.map((issue) => (
            <li key={issue.id} className="concern-card">
              <IssueConversation
                issue={issue}
                currentUser={user}
                allowStatusChange
                onReply={handleReply}
                onStatusChange={handleStatusChange}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
