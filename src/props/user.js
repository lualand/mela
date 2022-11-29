export function transform({
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
}) {
  return {
    id,
    name,
    login,
    tagline,
    nickname: name || login,
    avatarUrl: avatar_url?.replace(/large$/, 'md'),
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

export function eachTransform(data) {
  return data.map((item) => transform(item))
}
