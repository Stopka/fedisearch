import { z } from 'zod'

export const nodeResponseItemSchema = z.object({
  softwareName: z.string().nullable(),
  softwareVersion: z.string().nullable(),
  totalUserCount: z.number().nullable(),
  monthActiveUserCount: z.number().nullable(),
  halfYearActiveUserCount: z.number().nullable(),
  statusesCount: z.number().nullable(),
  openRegistrations: z.boolean().nullable(),
  refreshedAt: z.string().nullable(),
  domain: z.string()
})

export const nodeResponseSchema = z.object({
  hasMore: z.boolean(),
  nodes: z.array(nodeResponseItemSchema)
})

export type NodeResponse = z.infer<typeof nodeResponseSchema>
export type NodeResponseItem = z.infer<typeof nodeResponseItemSchema>
