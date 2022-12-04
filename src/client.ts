import type { AxiosInstance } from 'axios'
import { build, authRequest } from './axios'
import * as users from './operations/users'
import * as nodes from './operations/nodes'
import * as topics from './operations/topics'
import * as photos from './operations/photos'
import * as replies from './operations/replies'
import * as notifications from './operations/notifications'

export type ClientOpts = {
  baseUrl?: string
  auth?: string
}

export class Client {
  private readonly axios: AxiosInstance
  readonly users: ReturnType<typeof users.build>
  readonly nodes: ReturnType<typeof nodes.build>
  readonly topics: ReturnType<typeof topics.build>
  readonly photos: ReturnType<typeof photos.build>
  readonly replies: ReturnType<typeof replies.build>
  readonly notifications: ReturnType<typeof notifications.build>

  constructor({ auth, baseUrl }: ClientOpts = {}) {
    this.axios = build(auth, baseUrl)
    this.users = users.build(this.axios)
    this.nodes = nodes.build(this.axios)
    this.topics = topics.build(this.axios)
    this.photos = photos.build(this.axios)
    this.replies = replies.build(this.axios)
    this.notifications = notifications.build(this.axios)
  }

  async signIn(baseUrl: string, data: { username: string; password: string }) {
    const { data: token } = await authRequest(baseUrl).post('/sign-in', data)
    return token
  }

  setToken(value: string) {
    return (this.axios.defaults.params.access_token = value)
  }

  revokeToken() {
    this.setToken(undefined)
  }
}
