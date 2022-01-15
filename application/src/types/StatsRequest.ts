import { z } from 'zod'
export const statsRequestSortBySchema = z.enum(['nodeCount', 'accountCount', 'channelCount', 'softwareName'])
export const statsRequestSortWaySchema = z.enum(['asc', 'desc'])
export const statsRequestSchema = z.object({
  sortBy: z.optional(statsRequestSortBySchema),
  sortWay: z.optional(statsRequestSortWaySchema)
})

export type StatsRequest = z.infer<typeof statsRequestSchema>
export type StatsRequestSortWay = z.infer<typeof statsRequestSortWaySchema>
export type StatsRequestSortBy = z.infer<typeof statsRequestSortBySchema>
