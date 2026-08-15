import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

const mapIssue = (d) => ({
  ...d,
  author: d.author?.name || 'Unknown',
  authorDetails: d.author || null,
  createdAt: new Date(d.createdAt).getTime(),
  replies: (d.replies || []).map((reply) => ({
    ...reply,
    createdAt: new Date(reply.createdAt).getTime(),
  })),
})

export function useIssues(refreshKey = 0) {
  const [issues, setIssues] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/issues`, {
      headers: { ...(user?.jwt ? { Authorization: `Bearer ${user.jwt}` } : {}) }
    })
    .then(r => r.json())
    .then(data => {
      const mapped = data.map(mapIssue);
      setIssues(mapped);
    })
    .catch(console.error);
  }, [user, refreshKey]);

  return issues;
}

export function useUpdates() {
  const [updates, setUpdates] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/updates`, {
      headers: { ...(user?.jwt ? { Authorization: `Bearer ${user.jwt}` } : {}) }
    })
    .then(r => r.json())
    .then(data => {
      const mapped = data.map(d => ({
         ...d,
         author: d.author?.name || 'Unknown',
         createdAt: new Date(d.createdAt).getTime()
      }));
      setUpdates(mapped);
    })
    .catch(console.error);
  }, [user]);

  return updates;
}

export function useUsers(refreshKey = 0) {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.jwt) {
      setUsers([]);
      return;
    }

    fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to load users');
      }
      return res.json();
    })
    .then(setUsers)
    .catch((error) => {
      console.error(error);
      setUsers([]);
    });
  }, [user, refreshKey]);

  return users;
}

export async function addIssueAPI(issueData, jwt) {
  const res = await fetch(`${API_BASE_URL}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
    },
    body: JSON.stringify(issueData)
  });
  return res.json();
}

export async function addIssueReplyAPI(issueId, message, jwt) {
  const res = await fetch(`${API_BASE_URL}/issues/${issueId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
    },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Reply failed');
  }

  return res.json();
}

export async function updateIssueStatusAPI(issueId, status, jwt) {
  const res = await fetch(`${API_BASE_URL}/issues/${issueId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
    },
    body: JSON.stringify({ status })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Status update failed');
  }

  return res.json();
}

export async function addUpdateAPI(updateData, jwt) {
  const res = await fetch(`${API_BASE_URL}/updates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
    },
    body: JSON.stringify(updateData)
  });
  return res.json();
}
