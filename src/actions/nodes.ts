import type { AxiosInstance } from 'axios'
import type { NodeObject } from '../models/node'
import { transformKeys } from '../models/node'

function list(axios: AxiosInstance) {
  return async function allNodes() {
    const { data } = await axios.get('/nodes.json')
    return data.nodes.map(transformKeys) as NodeObject[]
  }
}

function retrieve(axios: AxiosInstance) {
  return async function getNode(nodeId: number) {
    const { data } = await axios.get(`/nodes/${nodeId}.json`)
    return transformKeys(data.node)
  }
}

export function build(axios: AxiosInstance) {
  return {
    list: list(axios),
    retrieve: retrieve(axios)
  }
}
