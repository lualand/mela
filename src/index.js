import notifications from './notifications'
import replies from './replies'
import topics from './topics'
import photos from './photos'
import nodes from './nodes'
import likes from './likes'
import users from './users'
import http from './http'
import auth from './auth'

function setToken(value) {
  return (http.defaults.params.access_token = value)
}

function revokeToken() {
  setToken(undefined)
}

export default {
  setToken,
  revokeToken,
  notifications,
  replies,
  topics,
  photos,
  nodes,
  likes,
  users,
  auth
}
