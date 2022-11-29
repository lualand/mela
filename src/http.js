import axios from 'axios'
const apiUrl = 'https://ruby-china.org/api/v3'

function getToken() {
  const data = localStorage.getItem('storeon')
  const token = JSON.parse(data)?.token

  return token?.access_token
}

export default axios.create({
  baseURL: apiUrl,
  params: {
    access_token: getToken() ?? undefined
  }
})
