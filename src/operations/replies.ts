import type { AxiosInstance } from 'axios'
import type { ReplyObject } from '../models/reply'
import { getNextCursor } from '../helpers/query'
import { transformKeys } from '../models/reply'

function list(axios: AxiosInstance) {
  return async function listReplies(
    topicId: number,
    params: { offset?: number; limit?: number } = {}
  ) {
    const { data } = await axios.get(`/topics/${topicId}/replies.json`, {
      params
    })
    const replies = data.replies.map(transformKeys) as ReplyObject[]
    const nextCursor = getNextCursor(replies, params)

    return { replies, nextCursor }
  }
}

function retrieve(axios: AxiosInstance) {
  return async function getReply(replyId: number) {
    const { data } = await axios.get(`/replies/${replyId}.json`)
    return transformKeys(data.reply)
  }
}

function create(axios: AxiosInstance) {
  return async function createReply() {
    const { data } = await axios.post('/replies')
    return data
  }
}

function update(axios: AxiosInstance) {
  return async function updateReply(replyId: number) {
    const { data } = await axios.put(`/replies/${replyId}.json`)
    return data
  }
}

function remove(axios: AxiosInstance) {
  return async function removeReply(replyId: number) {
    const { data } = await axios.delete(`/replies/${replyId}.json`)
    return data
  }
}

function like(axios: AxiosInstance) {
  return async function createReplyLike(targetId: number) {
    const { data } = await axios.post('/likes', { data: { obj_type: 'reply', obj_id: targetId } })
    return data
  }
}

function unlike(axios: AxiosInstance) {
  return async function removeReplyLike(targetId: number) {
    const { data } = await axios.delete('/likes', { data: { obj_type: 'reply', obj_id: targetId } })
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
    unlike: unlike(axios)
  }
}
