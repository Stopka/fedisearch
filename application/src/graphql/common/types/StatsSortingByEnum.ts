import { z } from 'zod'

export const StatsSortingByValues: readonly [string, ...string[]] = [
  'softwareName',
  'nodeCount',
  'accountFeedCount',
  'channelFeedCount'
]

export const statsSortingBySchema = z.enum(StatsSortingByValues)

export type StatsSoringByEnumType = z.infer<typeof statsSortingBySchema>
