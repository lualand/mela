export type UserObject = {
  id: number
  name: string
  login: string
  tagline: string
  nickname: string
  avatarUrl: string
  avatarLargeUrl: string
  topicsCount: number
  repliesCount: number
  followersCount: number
  followingCount: number
  favoritesCount: number
  isFollowed: boolean
  isBlocked: boolean
  createdAt: string
  updatedAt: string
}

export function transformKeys({
  id,
  name,
  login,
  avatar_url,
  topics_count,
  replies_count,
  followers_count,
  following_count,
  favorites_count,
  followed,
  blocked,
  tagline,
  created_at,
  updated_at
}: Record<string, any>): UserObject {
  return {
    id,
    name,
    login,
    tagline,
    nickname: name || login,
    avatarUrl: avatarUrl(avatar_url),
    avatarLargeUrl: avatar_url,
    topicsCount: topics_count,
    repliesCount: replies_count,
    followersCount: followers_count,
    followingCount: following_count,
    favoritesCount: favorites_count,
    isFollowed: !!followed,
    isBlocked: !!blocked,
    createdAt: created_at,
    updatedAt: updated_at
  }
}

export function avatarUrl(url: string) {
  return url?.replace(/large$/, 'md')
}
