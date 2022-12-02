import type { AxiosInstance } from 'axios'
import { build } from './helpers/axios'
import * as users from './operations/users'
import * as nodes from './operations/nodes'
import * as topics from './operations/topics'
import * as photos from './operations/photos'

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
  readonly replies: unknown
  readonly notifications: unknown

  constructor({ auth, baseUrl }: ClientOpts = {}) {
    this.axios = build(auth, baseUrl)
    this.users = users.build(this.axios)
    this.nodes = nodes.build(this.axios)
    this.topics = topics.build(this.axios)
    this.photos = photos.build(this.axios)
  }

  setToken(value: string) {
    return (this.axios.defaults.params.access_token = value)
  }

  revokeToken() {
    this.setToken(undefined)
  }
}
