import { avatarUrl } from './user'

export type TopicObject = {
  id: number
  title: string
  body: string
  bodyHtml: string
  grade: string
  hits: number
  excellent: number
  likesCount: number
  repliesCount: number
  lastReplyUserName: string
  isFavorited: boolean
  isFollowed: boolean
  isLiked: boolean
  nodeId: number
  nodeName: string
  userId: number
  userName: string
  userLogin: string
  userAvatarUrl: string
  userAvatarLargeUrl: string
  repliedAt: string
  createdAt: string
  updatedAt: string
}

export function transformKeys({
  id,
  title,
  body,
  body_html,
  grade,
  user,
  hits,
  liked,
  followed,
  favorited,
  node_id,
  node_name,
  excellent,
  likes_count,
  replies_count,
  last_reply_user_login,
  replied_at,
  created_at,
  updated_at
}: Record<string, any>): TopicObject {
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
    isFavorited: !!favorited,
    isFollowed: !!followed,
    isLiked: !!liked,
    nodeId: node_id,
    nodeName: node_name,
    userId: user?.id,
    userName: user?.name,
    userLogin: user?.login,
    userAvatarUrl: avatarUrl(user?.avatar_url),
    userAvatarLargeUrl: user?.avatar_url,
    repliedAt: replied_at,
    createdAt: created_at,
    updatedAt: updated_at
  }
}
