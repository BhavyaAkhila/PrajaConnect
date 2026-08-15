import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import CitizenDashboard from './pages/citizen/CitizenDashboard'
import ReportIssue from './pages/citizen/ReportIssue'
import MyReports from './pages/citizen/MyReports'
import PoliticianDashboard from './pages/politician/PoliticianDashboard'
import PostUpdate from './pages/politician/PostUpdate'
import Concerns from './pages/politician/Concerns'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import ModeratorDashboard from './pages/moderator/ModeratorDashboard'
import ModerationQueue from './pages/moderator/ModerationQueue'

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="citizen" element={<ProtectedRoute roles={['citizen']}><CitizenDashboard /></ProtectedRoute>} />
        <Route path="citizen/report" element={<ProtectedRoute roles={['citizen']}><ReportIssue /></ProtectedRoute>} />
        <Route path="citizen/reports" element={<ProtectedRoute roles={['citizen']}><MyReports /></ProtectedRoute>} />
        <Route path="politician" element={<ProtectedRoute roles={['politician']}><PoliticianDashboard /></ProtectedRoute>} />
        <Route path="politician/post" element={<ProtectedRoute roles={['politician']}><PostUpdate /></ProtectedRoute>} />
        <Route path="politician/concerns" element={<ProtectedRoute roles={['politician']}><Concerns /></ProtectedRoute>} />
        <Route path="admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="admin/users" element={<ProtectedRoute roles={['admin']}><UserManagement /></ProtectedRoute>} />
        <Route path="moderator" element={<ProtectedRoute roles={['moderator', 'admin']}><ModeratorDashboard /></ProtectedRoute>} />
        <Route path="moderator/queue" element={<ProtectedRoute roles={['moderator', 'admin']}><ModerationQueue /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
