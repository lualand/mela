export function transform({
  id,
  name,
  summary,
  section_id,
  section_name,
  topics_count,
  created_at,
  updated_at
}) {
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

export function eachTransform(data) {
  return data.map((item) => transform(item))
}
