export function getNextCursor(
  data: any[],
  { offset = 0, limit = 25 }: { offset?: number; limit?: number } = {}
) {
  return data.length === limit ? offset + limit : undefined
}
