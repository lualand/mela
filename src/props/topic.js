export function transform({
  id,
  title,
  body,
  body_html,
  grade,
  user,
  hits,
  node_id,
  node_name,
  excellent,
  likes_count,
  replies_count,
  last_reply_user_login,
  replied_at,
  created_at,
  updated_at
}) {
  return {
    id,
    title,
    body,
    grade,
    hits,
    excellent,
    bodyHtml: body_html,
    likesCount: likes_count,
    repliesCount: replies_count,
    lastReplyUserName: last_reply_user_login,
    repliedAt: replied_at,
    createdAt: created_at,
    updatedAt: updated_at,
    nodeId: node_id,
    nodeName: node_name,
    userId: user?.id,
    userName: user?.name,
    userLogin: user?.login,
    userAvatarUrl: user?.avatar_url?.replace(/large$/, 'md'),
    userAvatarLargeUrl: user?.avatar_url
  }
}

export function eachTransform(data) {
  return data.map((item) => transform(item))
}
