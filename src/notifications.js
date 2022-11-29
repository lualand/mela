import http from '../reol/http'

async function list(params) {
  const { data } = await http.get('/notifications.json', { params })
  return data
}

async function markAsRead(ids) {
  const { data } = await http.post('/notifications/read', { ids })
  return data
}

async function remove(notificationId) {
  const { data } = await http.delete(`/notifications/${notificationId}.json`)
  return data
}

async function clear() {
  const { data } = await http.delete('/notifications/all')
  return data
}

async function info() {
  const { data } = await http.get('/notifications/unread_count')
  return data
}

export default {
  list,
  markAsRead,
  remove,
  clear,
  info
}
