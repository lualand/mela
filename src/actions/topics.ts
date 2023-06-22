import type { AxiosInstance } from 'axios'
import type { TopicObject } from '../models/topic'
import { transformKeys } from '../models/topic'
import { withNextCursor } from '../utils'

export type ListTopicsArgs = {
  node_id?: number
  offset?: number
  limit?: number
  type?: 'popular' | 'recent' | 'excellent' | 'last_actived'
}

export type TopicParams = {
  nodeId: number
  title: string
  body: string
}

function list(axios: AxiosInstance) {
  return async function listTopics(params: ListTopicsArgs = {}) {
    const { data } = await axios.get('/topics.json', { params })
    const topics = data.topics.map(transformKeys) as TopicObject[]
    return withNextCursor(topics, params)
  }
}

function retrieve(axios: AxiosInstance) {
  return async function getTopic(topicId: number) {
    const { data } = await axios.get(`/topics/${topicId}.json`)
    const { liked, followed, favorited } = data.meta
    const topic = transformKeys(data.topic)

    if (liked || followed || favorited) {
      topic.isFavorited = favorited
      topic.isFollowed = followed
      topic.isLiked = liked
    }

    return topic
  }
}

function create(axios: AxiosInstance) {
  return async function createTopic({ title, body, nodeId }: TopicParams) {
    const { data } = await axios.post('/topics', {
      node_id: nodeId,
      title,
      body
    })
    return data
  }
}

function update(axios: AxiosInstance) {
  return async function updateTopic(
    topicId: number,
    { title, body, nodeId }: TopicParams
  ) {
    const { data } = await axios.put(`/topics/${topicId}`, {
      node_id: nodeId,
      title,
      body
    })
    return data
  }
}

function remove(axios: AxiosInstance) {
  return async function deleteTopic(topicId: number) {
    const { data } = await axios.delete(`/topics/${topicId}`)
    return data
  }
}

function like(axios: AxiosInstance) {
  return async function createTopicLike(targetId: number) {
    const { data } = await axios.post('/likes', {
      obj_type: 'topic',
      obj_id: targetId
    })
    return data
  }
}

function unlike(axios: AxiosInstance) {
  return async function deleteTopicLike(targetId: number) {
    const { data } = await axios.delete('/likes', {
      data: { obj_type: 'topic', obj_id: targetId }
    })
    return data
  }
}

function follow(axios: AxiosInstance) {
  return async function followTopic(targetId: number) {
    const { data } = await axios.post(`/topics/${targetId}/follow`)
    return data
  }
}

function unfollow(axios: AxiosInstance) {
  return async function unfollowTopic(targetId: number) {
    const { data } = await axios.post(`/topics/${targetId}/unfollow`)
    return data
  }
}

function favorite(axios: AxiosInstance) {
  return async function favoriteTopic(targetId: number) {
    const { data } = await axios.post(`/topics/${targetId}/favorite`)
    return data
  }
}

function unfavorite(axios: AxiosInstance) {
  return async function unfavoriteTopic(targetId: number) {
    const { data } = await axios.post(`/topics/${targetId}/unfavorite`)
    return data
  }
}

export function build(axios: AxiosInstance) {
  return {
    list: list(axios),
    retrieve: retrieve(axios),
    create: create(axios),
    update: update(axios),
    remove: remove(axios),
    like: like(axios),
    unlike: unlike(axios),
    follow: follow(axios),
    unfollow: unfollow(axios),
    favorite: favorite(axios),
    unfavorite: unfavorite(axios)
  }
}
