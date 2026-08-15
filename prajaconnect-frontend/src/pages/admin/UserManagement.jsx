import React from 'react'
import { useUsers } from '../../hooks/useApi'
import './UserManagement.css'

export default function UserManagement() {
  const users = useUsers()

  return (
    <div className="user-management page">
      <h1>User management</h1>
      <p className="page-desc">Review registered users, their roles, and the contact information they have shared.</p>
      {users.length === 0 ? (
        <p className="empty">No users in the system.</p>
      ) : (
        <div className="table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td><span className="role-badge">{u.role?.toLowerCase?.() || 'unknown'}</span></td>
                  <td>{u.email || 'Not provided'}</td>
                  <td>{u.phone || 'Not provided'}</td>
                  <td>{u.location || 'Not provided'}</td>
                  <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
