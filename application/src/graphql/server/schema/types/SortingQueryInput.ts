import { inputObjectType } from 'nexus'
import { NexusInputObjectTypeDef } from 'nexus/dist/definitions/inputObjectType'
import { z, ZodRawShape } from 'zod'

export const createSortingQueryInput = (name: string, sortingInput, definition: (t) => void): NexusInputObjectTypeDef<string> => {
  return inputObjectType({
    name,
    definition: (t) => {
      t.nonNull.field('sorting', {
        type: sortingInput
      })
      definition(t)
    }
  })
}

export const createSortingQueryInputSchema = <T extends ZodRawShape, U extends ZodRawShape>(querySchema:z.ZodObject<T>, sortingInputSchema:z.ZodObject<U>) => z.object({
  sorting: sortingInputSchema
}).merge(querySchema)

export type SortingQueryInputType<TQuery, TSortingInputType> = TQuery & { sorting: TSortingInputType }
