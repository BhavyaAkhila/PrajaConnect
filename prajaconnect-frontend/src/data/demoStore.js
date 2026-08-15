const STORAGE_KEYS = {
  issues: 'fsad08_issues_v2',
  updates: 'fsad08_updates',
  users: 'fsad08_users',
}

function get(key, defaultVal = []) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaultVal
  } catch {
    return defaultVal
  }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getIssues() {
  const issues = get(STORAGE_KEYS.issues)
  if (!issues.length) {
    const seed = [
      { id: '1', title: 'potholes in hanumanthuwaka junction,vizag', category: 'Infrastructure', status: 'open', author: 'Ramesh', createdAt: Date.now() - 86400000 * 2 },
      { id: '2', title: 'Park maintenance', category: 'Environment', status: 'in_progress', author: 'Suresh', createdAt: Date.now() - 86400000 },
    ]
    set(STORAGE_KEYS.issues, seed)
    return seed
  }
  return issues
}

export function addIssue(issue) {
  const issues = getIssues()
  const newIssue = { ...issue, id: String(Date.now()), createdAt: Date.now(), status: 'open' }
  issues.unshift(newIssue)
  set(STORAGE_KEYS.issues, issues)
  return newIssue
}

export function getUpdates() {
  const updates = get(STORAGE_KEYS.updates)
  if (!updates.length) {
    const seed = [
      { id: '1', title: 'Budget meeting summary', body: 'Summary of the latest budget discussions...', author: 'Ramesh', createdAt: Date.now() - 86400000 },
    ]
    set(STORAGE_KEYS.updates, seed)
    return seed
  }
  return updates
}

export function addUpdate(update) {
  const updates = getUpdates()
  const newUpdate = { ...update, id: String(Date.now()), createdAt: Date.now() }
  updates.unshift(newUpdate)
  set(STORAGE_KEYS.updates, updates)
  return newUpdate
}

export function getUsers() {
  return get(STORAGE_KEYS.users, [
    { id: '1', name: 'Ramesh', role: 'citizen' },
    { id: '2', name: 'Suresh', role: 'politician' },
  ])
}

export function setUsers(users) {
  set(STORAGE_KEYS.users, users)
}
