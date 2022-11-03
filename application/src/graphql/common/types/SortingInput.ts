import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createSortingInputSchema = (members: z.ZodEnum<[string, ...string[]]>) => {
  return z.object({
    sortBy: members,
    sortWay: z.enum(['asc', 'desc'])
  })
}

export interface SortingInputType<TMembers> {
  sortBy: TMembers
  sortWay: 'asc' | 'desc'
}
