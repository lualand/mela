import type { AxiosInstance } from 'axios'
import type { UserObject } from '../models/user'
import { transformKeys } from '../models/user'

function list(axios: AxiosInstance) {
  return async function allUsers(params: { limit?: number } = {}) {
    const { data } = await axios.get('/users.json', { params })
    return data.users.map(transformKeys) as UserObject[]
  }
}

function retrieve(axios: AxiosInstance) {
  return async function getUser(userId: number) {
    const { data } = await axios.get(`/users/${userId}.json`)
    const { blocked, followed } = data.meta
    const user = transformKeys(data.user)

    if (blocked || followed) {
      user.isFollowed = followed
      user.isBlocked = blocked
    }

    return user
  }
}

// async function me() {
//   const { data } = await http.get('/users/me.json')
//   const user = userProps.transform(data.user)
//   return { user }
// }

// async function follow(targetId) {
//   const { data } = await http.post(`/users/${targetId}/follow`)
//   return data
// }

// async function unfollow(targetId) {
//   const { data } = await http.post(`/users/${targetId}/unfollow`)
//   return data
// }

// async function listTopics(userId) {
//   const { data } = await http.get(`/users/${userId}/topics.json`)
//   const topics = topicProps.eachTransform(data.topics)
//   return { topics }
// }

// async function listReplies(userId) {
//   const { data } = await http.get(`/users/${userId}/replies.json`)
//   const replies = replyProps.eachTransform(data.replies)
//   return { replies }
// }

// async function listFavorites(userId) {
//   const { data } = await http.get(`/users/${userId}/favorites.json`)
//   const favorites = topicProps.eachTransform(data.topics)
//   return { favorites }
// }

// async function listFollowers(userId) {
//   const { data } = await http.get(`/users/${userId}/followers.json`)
//   const followers = userProps.eachTransform(data.followers)
//   return { followers }
// }

// async function listFollowing(userId) {
//   const { data } = await http.get(`/users/${userId}/following.json`)
//   const following = userProps.eachTransform(data.following)
//   return { following }
// }
//   me,
//   follow,
//   unfollow,
//   listTopics,
//   listReplies,
//   listFavorites,
//   listFollowers,
//   listFollowing

export function build(axios: AxiosInstance) {
  return {
    list: list(axios),
    retrieve: retrieve(axios)
  }
}
