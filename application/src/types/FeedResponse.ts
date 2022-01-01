import { z } from 'zod'

export const feedResponseFieldSchema = z.object({
  name: z.string(),
  value: z.string()
})

export const feedResponseItemSchema = z.object({
  avatar: z.string().url().nullable(),
  bot: z.boolean().nullable(),
  createdAt: z.string(),
  description: z.string(),
  displayName: z.string(),
  fields: z.array(feedResponseFieldSchema).nullable(),
  followersCount: z.number().nullable(),
  followingCount: z.number().nullable(),
  statusesCount: z.number().nullable(),
  lastStatusAt: z.string().nullable(),
  name: z.string(),
  node: z.object({
    domain: z.string(),
    softwareName: z.string()
  }),
  type: z.enum(['account', 'channel']),
  url: z.string().url()
})

export const feedResponseSchema = z.object({
  hasMore: z.boolean(),
  feeds: z.array(feedResponseItemSchema)
})

export type FeedResponse = z.infer<typeof feedResponseSchema>
export type FeedResponseItem = z.infer<typeof feedResponseItemSchema>
export type FeedResponseField = z.infer<typeof feedResponseFieldSchema>
