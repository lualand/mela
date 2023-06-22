import type { AxiosInstance } from 'axios'

function upload(axios: AxiosInstance) {
  return async function uploadFiles(file: unknown) {
    const { data } = await axios.postForm('/photos', { file })
    const url = data.image_url as string
    return {
      url
    }
  }
}

export function build(axios: AxiosInstance) {
  return {
    upload: upload(axios)
  }
}
