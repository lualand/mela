import type { AxiosInstance } from 'axios'
import type { PaginatedArgs } from '../utils'
import type { TopicObject } from '../models/topic'
import type { ReplyObject } from '../models/reply'
import type { UserObject } from '../models/user'
import { transformKeys } from '../models/user'
import { transformKeys as transformReplyKeys } from '../models/reply'
import { transformKeys as transformTopicKeys } from '../models/topic'
import { withNextCursor } from '../utils'

function list(axios: AxiosInstance) {
  return async function allUsers(params: { limit?: number } = {}) {
    const { data } = await axios.get('/users.json', { params })
    return data.users.map(transformKeys) as UserObject[]
  }
}

function retrieve(axios: AxiosInstance) {
  return async function getUser(userId: number | string) {
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

function retrieveMe(axios: AxiosInstance) {
  return async function getUserMe() {
    const { data } = await axios.get('/users/me.json')
    return transformKeys(data.user)
  }
}

function follow(axios: AxiosInstance) {
  return async function followUser(targetId: number | string) {
    const { data } = await axios.post(`/users/${targetId}/follow`)
    return data
  }
}

function unfollow(axios: AxiosInstance) {
  return async function unfollowUser(targetId: number | string) {
    const { data } = await axios.post(`/users/${targetId}/unfollow`)
    return data
  }
}

function topics(axios: AxiosInstance) {
  return async function listTopics(
    userId: number | string,
    params: PaginatedArgs = {}
  ) {
    const { data } = await axios.get(`/users/${userId}/topics.json`, { params })
    const topics = data.topics.map(transformTopicKeys) as TopicObject[]
    return withNextCursor(topics, params)
  }
}

function replies(axios: AxiosInstance) {
  return async function listReplies(
    userId: number | string,
    params: PaginatedArgs = {}
  ) {
    const { data } = await axios.get(`/users/${userId}/replies.json`, {
      params
    })
    const replies = data.replies.map(transformReplyKeys) as ReplyObject[]
    return withNextCursor(replies, params)
  }
}

function favorites(axios: AxiosInstance) {
  return async function listFavorites(
    userId: number | string,
    params: PaginatedArgs = {}
  ) {
    const { data } = await axios.get(`/users/${userId}/favorites.json`, {
      params
    })
    const topics = data.topics.map(transformTopicKeys) as TopicObject[]
    return withNextCursor(topics, params)
  }
}

function followers(axios: AxiosInstance) {
  return async function listFollowers(
    userId: number | string,
    params: PaginatedArgs = {}
  ) {
    const { data } = await axios.get(`/users/${userId}/followers.json`, {
      params
    })
    const followers = data.followers.map(transformKeys) as UserObject[]
    return withNextCursor(followers, params)
  }
}

function following(axios: AxiosInstance) {
  return async function listFollowing(
    userId: number | string,
    params: PaginatedArgs = {}
  ) {
    const { data } = await axios.get(`/users/${userId}/following.json`, {
      params
    })
    const following = data.following.map(transformKeys) as UserObject[]
    return withNextCursor(following, params)
  }
}

export function build(axios: AxiosInstance) {
  return {
    list: list(axios),
    retrieve: retrieve(axios),
    me: retrieveMe(axios),
    follow: follow(axios),
    unfollow: unfollow(axios),
    listTopics: topics(axios),
    listReplies: replies(axios),
    listFavorites: favorites(axios),
    listFollowers: followers(axios),
    listFollowing: following(axios)
  }
}
