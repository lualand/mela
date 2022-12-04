import type { AxiosInstance } from 'axios'
import type { PaginatedArgs } from '../utils'

function list(axios: AxiosInstance) {
  return async function listNotifications(params: PaginatedArgs = {}) {
    const { data } = await axios.get('/notifications.json', { params })
    return data
  }
}

function markAsRead(axios: AxiosInstance) {
  return async function setNotifications(ids: number[]) {
    const { data } = await axios.post('/notifications/read', { ids })
    return data
  }
}

function remove(axios: AxiosInstance) {
  return async function deleteNotification(notificationId: number) {
    const { data } = await axios.delete(`/notifications/${notificationId}`)
    return data
  }
}

function clear(axios: AxiosInstance) {
  return async function deleteAll() {
    const { data } = await axios.delete('/notifications/all')
    return data
  }
}

function info(axios: AxiosInstance) {
  return async function unreadCount() {
    const { data } = await axios.get('/notifications/unread_count')
    return data
  }
}

export function build(axios: AxiosInstance) {
  return {
    list: list(axios),
    markAsRead: markAsRead(axios),
    remove: remove(axios),
    clear: clear(axios),
    info: info(axios)
  }
}
