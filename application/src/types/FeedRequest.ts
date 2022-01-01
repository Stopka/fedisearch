import { z } from 'zod'
import { preserveUndefined, stringToInt, transform } from '../lib/transform'

export const feedRequestSchema = z.object({
  search: z.string(),
  page: transform(
    z.string().optional(),
    preserveUndefined(stringToInt),
    z.number().gte(0).optional()
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

export type FeedRequest = z.infer<typeof feedRequestSchema>
