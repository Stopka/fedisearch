import { z } from 'zod'
import { preserveUndefined, stringToInt, transform } from '../lib/transform'

export const statsRequestSortBySchema = z.enum([
  'softwareName',
  'softwareVersion',
  'totalUserCount',
  'monthActiveUserCount',
  'halfYearActiveUserCount',
  'statusesCount',
  'openRegistrations',
  'refreshedAt',
  'domain'
])

export const statsRequestSortWaySchema = z.enum([
  'asc',
  'desc'
])

export const nodeRequestSchema = z.object({
  sortBy: z.optional(statsRequestSortBySchema),
  sortWay: z.optional(statsRequestSortWaySchema),
  search: z.string().optional(),
  page: transform(
    z.string().optional(),
    preserveUndefined(stringToInt),
    z.number().gte(0).optional()
  )
})

export type NodeRequest = z.infer<typeof nodeRequestSchema>
