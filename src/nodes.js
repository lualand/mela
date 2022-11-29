import * as nodeProps from './props/node'
import http from '../reol/http'

async function allNodes() {
  const { data } = await http.get('/nodes.json')
  const nodes = nodeProps.eachTransform(data.nodes)
  return { nodes }
}

async function getNode(nodeId) {
  const { data } = await http.get(`/nodes/${nodeId}.json`)
  const node = nodeProps.transform(data.node)
  return { node }
}

export default {
  allNodes,
  getNode
}
