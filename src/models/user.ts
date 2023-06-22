export type UserObject = {
  id: number
  bio: string
  name: string
  email: string
  login: string
  tagline: string
  company: string
  nickname: string
  location: string
  avatarUrl: string
  avatarLargeUrl: string
  twitterUrl: string
  githubUrl: string
  website: string
  level: string
  levelName: string
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
  bio,
  name,
  email,
  login,
  level,
  level_name,
  avatar_url,
  topics_count,
  replies_count,
  followers_count,
  following_count,
  favorites_count,
  followed,
  blocked,
  tagline,
  website,
  twitter,
  github,
  company,
  location,
  created_at,
  updated_at
}: Record<string, any>): UserObject {
  return {
    id,
    bio,
    name,
    email,
    login,
    level,
    tagline,
    company,
    website,
    location,
    nickname: name || login,
    avatarUrl: avatarUrl(avatar_url),
    avatarLargeUrl: avatar_url,
    twitterUrl: twitter,
    githubUrl: github,
    levelName: level_name,
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
