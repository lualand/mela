import http from '../reol/http'

async function upload(file) {
  const { data } = await http.post('/photos')
}

export default {
  upload
}
