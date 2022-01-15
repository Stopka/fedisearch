import { z } from 'zod'

export const statsResponseSoftwareSchema = z.object({
  name: z.string().nullable(),
  nodeCount: z.number().int().min(0),
  accountCount: z.number().int().min(0),
  channelCount: z.number().int().min(0),
  newNodeCount: z.number().int().min(0)
})

export const statsResponseSchema = z.object({
  softwares: z.array(statsResponseSoftwareSchema)
})

export type StatsResponse = z.infer<typeof statsResponseSchema>
export type StatsResponseSoftware = z.infer<typeof statsResponseSoftwareSchema>
