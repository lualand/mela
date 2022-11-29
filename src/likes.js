import http from '../reol/http'

function like(type, id) {
  return http.post('/likes', {
    obj_type: type,
    obj_id: id
  })
}

function unlike(type, id) {
  return http.delete('/likes', {
    data: {
      obj_type: type,
      obj_id: id
    }
  })
}

async function createTopicLike(targetId) {
  const { data } = await like('topic', targetId)
  return data
}

async function createReplyLike(targetId) {
  const { data } = await like('reply', targetId)
  return data
}

async function removeTopicLike(targetId) {
  const { data } = await unlike('topic', targetId)
  return data
}

async function removeReplyLike(targetId) {
  const { data } = await unlike('reply', targetId)
  return data
}

export default {
  createTopicLike,
  createReplyLike,
  removeTopicLike,
  removeReplyLike
}
