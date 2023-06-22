import { avatarUrl } from './user'

export type ReplyObject = {
  id: number
  body: string
  bodyHtml: string
  likesCount: number
  topicId: number
  topicTitle: string
  userId: number
  userName: string
  userLogin: string
  userAvatarUrl: string
  userAvatarLargeUrl: string
  createdAt: string
  updatedAt: string
}

export function transformKeys({
  id,
  body,
  body_html,
  likes_count,
  user,
  topic_id,
  topic_title,
  created_at,
  updated_at
}: Record<string, any>): ReplyObject {
  return {
    id,
    body,
    bodyHtml: body_html,
    likesCount: likes_count,
    topicId: topic_id,
    topicTitle: topic_title,
    userId: user?.id,
    userName: user?.name,
    userLogin: user?.login,
    userAvatarUrl: avatarUrl(user?.avatar_url),
    userAvatarLargeUrl: user?.avatar_url,
    createdAt: created_at,
    updatedAt: updated_at
  }
}
