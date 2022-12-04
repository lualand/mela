import axios from 'axios'

export function build(
  auth: string,
  baseUrl: string = 'https://ruby-china.org/api/v3'
) {
  return axios.create({
    baseURL: baseUrl,
    params: {
      access_token: auth ?? undefined
    }
  })
}

export function authRequest(baseUrl: string) {
  return axios.create({
    baseURL: baseUrl
  })
}
