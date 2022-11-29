import * as topicProps from './props/topic'
import * as replyProps from './props/reply'
import * as userProps from './props/user'
import http from '../reol/http'

async function allUsers(params) {
  const { data } = await http.get('/users.json', { params })
  const users = userProps.eachTransform(data.users)
  return { users }
}

async function getUser(userId) {
  const { data } = await http.get(`/users/${userId}.json`)
  const user = userProps.transform(data.user)
  return { user, meta: data.meta }
}

async function me() {
  const { data } = await http.get('/users/me.json')
  const user = userProps.transform(data.user)
  return { user }
}

async function follow(targetId) {
  const { data } = await http.post(`/users/${targetId}/follow`)
  return data
}

async function unfollow(targetId) {
  const { data } = await http.post(`/users/${targetId}/unfollow`)
  return data
}

async function listTopics(userId) {
  const { data } = await http.get(`/users/${userId}/topics.json`)
  const topics = topicProps.eachTransform(data.topics)
  return { topics }
}

async function listReplies(userId) {
  const { data } = await http.get(`/users/${userId}/replies.json`)
  const replies = replyProps.eachTransform(data.replies)
  return { replies }
}

async function listFavorites(userId) {
  const { data } = await http.get(`/users/${userId}/favorites.json`)
  const favorites = topicProps.eachTransform(data.topics)
  return { favorites }
}

async function listFollowers(userId) {
  const { data } = await http.get(`/users/${userId}/followers.json`)
  const followers = userProps.eachTransform(data.followers)
  return { followers }
}

async function listFollowing(userId) {
  const { data } = await http.get(`/users/${userId}/following.json`)
  const following = userProps.eachTransform(data.following)
  return { following }
}

export default {
  allUsers,
  getUser,
  me,
  follow,
  unfollow,
  listTopics,
  listReplies,
  listFavorites,
  listFollowers,
  listFollowing
}
