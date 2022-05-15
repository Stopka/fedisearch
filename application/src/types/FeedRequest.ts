import { z } from 'zod'
import { preserveUndefined, stringToInt, stringTrimmed, transform } from '../lib/transform'

export const feedRequestQuerySchema = z.object({
  search: transform(
    z.string().optional(),
    stringTrimmed,
    z.string()
  )
  /*
  softwareName: z.string().optional(),
  domain: z.string().optional(),
  name: z.string().optional(),
  displayName: z.string().optional(),
  description: z.string().optional(),
  followersCount: transform(
    z.string().optional(),
    preserveUndefined(stringToInt),
    z.number().gte(0).optional()
  ),
  followingCount: transform(
    z.string().optional(),
    preserveUndefined(stringToInt),
    z.number().gte(0).optional()
  ),
  statusesCount: transform(
    z.string().optional(),
    preserveUndefined(stringToInt),
    z.number().gte(0).optional()
  ),
  bot: transform(
    z.string().optional(),
    preserveUndefined(stringToBool),
    z.boolean().optional()
  ),
  lastStatusAt: z.string().optional(),
  createdAt: z.string().optional(),
  type: z.enum(['account', 'channel']).optional()
  */
})

export const feedRequestSchema = feedRequestQuerySchema.extend({
  page: transform(
    z.string().optional(),
    preserveUndefined(stringToInt),
    z.number().gte(0).optional()
  )
})

export type FeedRequest = z.infer<typeof feedRequestSchema>
export type FeedRequestQuery = z.infer<typeof feedRequestQuerySchema>
