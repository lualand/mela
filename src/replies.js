import * as replyProps from './props/reply'
import http from '../reol/http'

async function getReply(replyId) {
  const { data } = await http.get(`/replies/${replyId}.json`)
  const reply = replyProps.transform(data.reply)
  return { reply }
}

async function create() {
  const { data } = await http.post('/replies')
  return data
}

async function update(replyId) {
  const { data } = await http.put(`/replies/${replyId}.json`)
  return data
}

async function remove(replyId) {
  const { data } = await http.delete(`/replies/${replyId}.json`)
  return data
}

export default {
  getReply,
  create,
  update,
  remove
}
