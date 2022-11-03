import { z } from 'zod'

export const NodeSortingByValues: readonly [string, ...string[]] = [
  'domain',
  'softwareName',
  'totalUserCount',
  'monthActiveUserCount',
  'halfYearActiveUserCount',
  'statusesCount',
  'accountFeedCount',
  'openRegistrations',
  'refreshedAt'
]

export const nodeSortingBySchema = z.enum(NodeSortingByValues)

export type NodeSoringByEnumType = z.infer<typeof nodeSortingBySchema>
