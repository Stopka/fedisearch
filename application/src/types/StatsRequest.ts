import { z } from 'zod'
import { transform, undefinedToDefault } from '../lib/transform'
export const statsRequestSortBySchema = z.enum(['nodeCount', 'accountCount', 'channelCount', 'softwareName'])
export const statsRequestSortWaySchema = z.enum(['asc', 'desc'])
export const statsRequestSchema = z.object({
  sortBy: transform(
    z.optional(statsRequestSortBySchema),
    undefinedToDefault<StatsRequestSortBy>('accountCount'),
    z.optional(statsRequestSortBySchema)
  ),
  sortWay: transform(
    z.optional(statsRequestSortWaySchema),
    undefinedToDefault<StatsRequestSortWay>('desc'),
    statsRequestSortWaySchema
  )
})

export type StatsRequest = z.infer<typeof statsRequestSchema>
export type StatsRequestSortWay = z.infer<typeof statsRequestSortWaySchema>
export type StatsRequestSortBy = z.infer<typeof statsRequestSortBySchema>
