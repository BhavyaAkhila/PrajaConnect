import React, { useState } from 'react'
import IssueConversation from '../../components/IssueConversation'
import { useAuth } from '../../context/AuthContext'
import { addIssueReplyAPI, updateIssueStatusAPI, useIssues } from '../../hooks/useApi'
import './ModerationQueue.css'

export default function ModerationQueue() {
  const [refreshKey, setRefreshKey] = useState(0)
  const { user } = useAuth()
  const issues = useIssues(refreshKey)
  const activeIssues = issues.filter((issue) => issue.status !== 'RESOLVED')

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
    <div className="moderation-queue page">
      <h1>Moderation queue</h1>
      <p className="page-desc">Review active citizen issues, respond when needed, and keep conversations moving.</p>
      {activeIssues.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">Clear</span>
          <p>No active issues are waiting for moderation right now.</p>
        </div>
      ) : (
        <ul className="queue-list">
          {activeIssues.map((issue) => (
            <li key={issue.id} className="queue-item">
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
