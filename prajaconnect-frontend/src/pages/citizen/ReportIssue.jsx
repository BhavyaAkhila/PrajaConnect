import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { addIssueAPI } from '../../hooks/useApi'
import './ReportIssue.css'

const CATEGORIES = ['Infrastructure', 'Environment', 'Safety', 'Healthcare', 'Education', 'Other']

export default function ReportIssue() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Infrastructure')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'Please add a short, descriptive title.'
    if (!description.trim() || description.trim().length < 15) e.description = 'Please provide more details (at least 15 characters).'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate()
    setErrors(validation)
    if (Object.keys(validation).length > 0) return
    try {
      setIsSubmitting(true)
      await addIssueAPI({ title: title.trim(), category, description: description.trim(), author: user?.name || 'Citizen' }, user?.jwt)
      setSuccess('Your report has been submitted.');
      setTitle('')
      setDescription('')
      // brief delay to let user read confirmation, then navigate to reports
      setTimeout(() => navigate('/citizen/reports'), 1100)
    } catch (err) {
      console.error(err)
      setErrors({ submit: 'Failed to submit report. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="report-issue page">
      <h1>Report an issue</h1>
      <p className="page-desc">Describe the issue or feedback you want to share with your representatives.</p>
      <form onSubmit={handleSubmit} className="form-card" noValidate>
        {success && <div className="form-success" role="status" aria-live="polite">{success}</div>}
        {errors.submit && <div className="form-error" role="alert">{errors.submit}</div>}

        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief title for the issue"
            required
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && <span id="title-error" className="field-error">{errors.title}</span>}
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue or feedback in detail..."
            rows={5}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && <span id="description-error" className="field-error">{errors.description}</span>}
        </label>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit report'}
          </button>
        </div>
      </form>
    </div>
  )
}
