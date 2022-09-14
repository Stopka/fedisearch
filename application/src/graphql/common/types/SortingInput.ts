import { z } from 'zod'

export const createSortingInputSchema = (members:z.ZodEnum<[string, ...string[]]>) => {
  return z.object({
    sortBy: members,
    sortWay: z.enum(['asc', 'desc'])
  })
}

export type SortingInputType<TMembers> = {
    sortBy: TMembers
    sortWay: 'asc'|'desc'
}
