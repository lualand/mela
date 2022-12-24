export type NodeObject = {
  id: number
  name: string
  summary: string
  parentId: number
  parentName: string
  topicsCount: number
  createdAt: string
  updatedAt: string
}

export function transformKeys({
  id,
  name,
  summary,
  section_id,
  section_name,
  topics_count,
  created_at,
  updated_at
}: Record<string, any>): NodeObject {
  return {
    id,
    name,
    summary,
    parentId: section_id,
    parentName: section_name,
    topicsCount: topics_count,
    createdAt: created_at,
    updatedAt: updated_at
  }
}
