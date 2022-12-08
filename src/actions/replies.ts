import type { AxiosInstance } from 'axios'
import type { PaginatedArgs } from '../utils'
import type { ReplyObject } from '../models/reply'
import { transformKeys } from '../models/reply'
import { withNextCursor } from '../utils'

export type ReplyParams = {
  body: string
}

function list(axios: AxiosInstance) {
  return async function listReplies(
    topicId: number,
    params: PaginatedArgs = {}
  ) {
    const { data } = await axios.get(`/topics/${topicId}/replies.json`, {
      params
    })
    const replies = data.replies.map(transformKeys) as ReplyObject[]
    return withNextCursor(replies, params)
  }
}

function retrieve(axios: AxiosInstance) {
  return async function getReply(replyId: number) {
    const { data } = await axios.get(`/replies/${replyId}.json`)
    return transformKeys(data.reply)
  }
}

function create(axios: AxiosInstance) {
  return async function createReply(topicId: number, { body }: ReplyParams) {
    const { data } = await axios.post(`/topics/${topicId}/replies`, { body })
    return data
  }
}

function update(axios: AxiosInstance) {
  return async function updateReply(replyId: number, { body }: ReplyParams) {
    const { data } = await axios.put(`/replies/${replyId}`, { body })
    return data
  }
}

function remove(axios: AxiosInstance) {
  return async function deleteReply(replyId: number) {
    const { data } = await axios.delete(`/replies/${replyId}`)
    return data
  }
}

function like(axios: AxiosInstance) {
  return async function createReplyLike(targetId: number) {
    const { data } = await axios.post('/likes', {
      obj_type: 'reply',
      obj_id: targetId
    })
    return data
  }
}

function unlike(axios: AxiosInstance) {
  return async function deleteReplyLike(targetId: number) {
    const { data } = await axios.delete('/likes', {
      data: { obj_type: 'reply', obj_id: targetId }
    })
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
