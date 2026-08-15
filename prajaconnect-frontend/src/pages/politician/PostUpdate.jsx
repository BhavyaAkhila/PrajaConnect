import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { addUpdateAPI } from '../../hooks/useApi'
import './PostUpdate.css'

export default function PostUpdate() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addUpdateAPI({ title, body, author: user?.name || 'Politician' }, user?.jwt)
    navigate('/politician')
  }

  return (
    <div className="post-update page">
      <h1>Post an update</h1>
      <p className="page-desc">Share news and updates with citizens.</p>
      <form onSubmit={handleSubmit} className="form-card">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Update title"
            required
          />
        </label>
        <label>
          Content
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your update..."
            rows={6}
          />
        </label>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary">Publish update</button>
        </div>
      </form>
    </div>
  )
}
