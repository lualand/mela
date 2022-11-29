export function getNextCursor(data, { limit = 20, offset = 0 }) {
  return data.length === limit ? offset + limit : undefined
}
