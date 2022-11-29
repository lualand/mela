export function transform({
  id,
  body,
  body_html,
  likes_count,
  user,
  topic_id,
  topic_title,
  created_at,
  updated_at
}) {
  return {
    id,
    body,
    bodyHtml: body_html,
    likesCount: likes_count,
    createdAt: created_at,
    updatedAt: updated_at,
    userId: user?.id,
    userName: user?.name,
    userLogin: user?.login,
    userAvatarUrl: user?.avatar_url?.replace(/large$/, 'md'),
    userAvatarLargeUrl: user?.avatar_url,
    topicId: topic_id,
    topicTitle: topic_title
  }
}

export function eachTransform(data) {
  return data.map((item) => transform(item))
}
