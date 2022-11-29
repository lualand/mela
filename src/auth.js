import axios from 'axios'
const apiUrl = 'https://thredded.vercel.app/api'

async function login({ username, password }) {
  const { data } = await axios.post(`${apiUrl}/login`, {
    username,
    password
  })

  return data
}

export default {
  apiUrl,
  login
}
