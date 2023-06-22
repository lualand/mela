export type PaginatedArgs = {
  offset?: number
  limit?: number
}

export function withNextCursor<T>(
  data: T[],
  { offset = 0, limit = 25 }: PaginatedArgs
) {
  const nextCursor = data.length === limit ? offset + limit : undefined
  const hasMore = !!nextCursor

  return {
    nextCursor,
    hasMore,
    data
  }
}
