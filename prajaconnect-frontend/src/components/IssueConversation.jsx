import React, { useState } from 'react'
import './IssueConversation.css'

const STATUS_OPTIONS = [
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED', label: 'Resolved' },
]

export default function IssueConversation({
  issue,
  currentUser,
  allowStatusChange = false,
  allowReply = true,
  onReply,
  onStatusChange,
}) {
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState('')

  const replies = issue.replies || []

  const handleReply = async (e) => {
    e.preventDefault()
    if (!message.trim() || !onReply) return

    try {
      setSubmitting(true)
      await onReply(issue.id, message.trim())
      setMessage('')
    } catch (error) {
      console.error(error)
      alert('Could not post reply right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusChange = async (status) => {
    if (!onStatusChange || status === issue.status) return

    try {
      setUpdatingStatus(status)
      await onStatusChange(issue.id, status)
    } catch (error) {
      console.error(error)
      alert('Could not update issue status right now. Please try again.')
    } finally {
      setUpdatingStatus('')
    }
  }

  return (
    <div className="issue-conversation">
      <div className="issue-conversation__header">
        <div>
          <strong>{issue.title}</strong>
          <div className="issue-conversation__meta">
            {issue.category} · {issue.author} · {new Date(issue.createdAt).toLocaleDateString()}
          </div>
        </div>
        <span className={`issue-conversation__status issue-conversation__status--${issue.status.toLowerCase()}`}>
          {issue.status.replace('_', ' ')}
        </span>
      </div>

      {issue.description && <p className="issue-conversation__description">{issue.description}</p>}

      {allowStatusChange && (
        <div className="issue-conversation__status-row">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`btn ${issue.status === option.value ? 'btn-primary' : 'btn-ghost'} btn-sm`}
              disabled={updatingStatus === option.value}
              onClick={() => handleStatusChange(option.value)}
            >
              {updatingStatus === option.value ? 'Updating...' : option.label}
            </button>
          ))}
        </div>
      )}

      <div className="issue-conversation__thread">
        <h4>Conversation</h4>
        {replies.length === 0 ? (
          <p className="issue-conversation__empty">No replies yet.</p>
        ) : (
          <ul className="issue-conversation__list">
            {replies.map((reply) => (
              <li
                key={reply.id}
                className={`issue-conversation__reply ${reply.author?.id === currentUser?.id ? 'issue-conversation__reply--self' : ''}`}
              >
                <div className="issue-conversation__reply-head">
                  <span>{reply.author?.name || 'Unknown'}</span>
                  <span>{reply.author?.role?.toLowerCase?.() || ''}</span>
                  <time>{new Date(reply.createdAt).toLocaleString()}</time>
                </div>
                <p>{reply.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {allowReply && (
        <form className="issue-conversation__composer" onSubmit={handleReply}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Write a reply or status update..."
          />
          <div className="issue-conversation__composer-actions">
            <span>{currentUser?.name ? `Replying as ${currentUser.name}` : ''}</span>
            <button type="submit" className="btn btn-primary btn-sm" disabled={submitting || !message.trim()}>
              {submitting ? 'Posting...' : 'Post reply'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
