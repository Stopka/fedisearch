import { z } from 'zod'
import { preserveUndefined, stringToInt, stringTrimmed, transform, undefinedToDefault } from '../lib/transform'

export const nodeRequestSortBySchema = z.enum([
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

export const nodeRequestSortWaySchema = z.enum([
  'asc',
  'desc'
])

export const nodeRequestQuerySchema = z.object({
  sortBy: transform(
    z.optional(nodeRequestSortBySchema),
    undefinedToDefault<NodeRequestSortBy>('refreshedAt'),
    nodeRequestSortBySchema
  ),
  sortWay: transform(
    z.optional(nodeRequestSortWaySchema),
    undefinedToDefault<NodeRequestSortWay>('desc'),
    nodeRequestSortWaySchema
  ),
  search: transform(
    z.string().optional(),
    stringTrimmed,
    z.string()
  )
})

export const nodeRequestSchema = nodeRequestQuerySchema.extend({
  page: transform(
    z.string().optional(),
    preserveUndefined(stringToInt),
    z.number().gte(0).optional()
  )
})

export type NodeRequestQuery = z.infer<typeof nodeRequestQuerySchema>
export type NodeRequest = z.infer<typeof nodeRequestSchema>
export type NodeRequestSortWay = z.infer<typeof nodeRequestSortWaySchema>
export type NodeRequestSortBy = z.infer<typeof nodeRequestSortBySchema>
