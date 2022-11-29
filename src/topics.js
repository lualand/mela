import * as topicProps from './props/topic'
import * as replyProps from './props/reply'
import { getNextCursor } from './utils'
import http from '../reol/http'

function listTopics(type, params) {
  return http.get('/topics.json', {
    params: {
      ...params,
      type
    }
  })
}

async function list(params = {}) {
  const { data } = await listTopics('last_actived', params)
  const topics = topicProps.eachTransform(data.topics)
  return { topics }
}

async function listPopular(params = {}) {
  const { data } = await listTopics('popular', params)
  const topics = topicProps.eachTransform(data.topics)
  return { topics }
}

async function listRecent(params = {}) {
  const { data } = await listTopics('recent', params)
  const topics = topicProps.eachTransform(data.topics)
  return { topics }
}

async function listRecommend(params = {}) {
  const { data } = await listTopics('excellent', params)
  const topics = topicProps.eachTransform(data.topics)
  return { topics }
}

async function getTopic(topicId) {
  const { data } = await http.get(`/topics/${topicId}.json`)
  const topic = topicProps.transform(data.topic)
  return { topic, meta: data.meta }
}

async function listReplies(topicId, params = {}) {
  const { data } = await http.get(`/topics/${topicId}/replies.json`, { params })
  const replies = replyProps.eachTransform(data.replies)
  const nextCursor = getNextCursor(replies, params)

  return { replies, nextCursor }
}

async function follow(targetId) {
  const { data } = await http.post(`/topics/${targetId}/follow`)
  return data
}

async function unfollow(targetId) {
  const { data } = await http.post(`/topics/${targetId}/unfollow`)
  return data
}

async function favorite(targetId) {
  const { data } = await http.post(`/topics/${targetId}/favorite`)
  return data
}

async function unfavorite(targetId) {
  const { data } = await http.post(`/topics/${targetId}/unfavorite`)
  return data
}

async function create() {
  const { data } = await http.post('/topics')
  return data
}

async function update(topicId) {
  const { data } = await http.put(`/topics/${topicId}.json`)
  return data
}

async function remove(topicId) {
  const { data } = await http.delete(`/topics/${topicId}.json`)
  return data
}

export default {
  list,
  listPopular,
  listRecent,
  listRecommend,
  getTopic,
  listReplies,
  follow,
  unfollow,
  favorite,
  unfavorite,
  create,
  update,
  remove
}
