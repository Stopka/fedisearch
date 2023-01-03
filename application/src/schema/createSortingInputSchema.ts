import { z, ZodObject } from 'zod'
import { SortingWayEnum } from '../graphql/generated/types'

declare interface EnumLike {
  [k: string]: string | number
  [nu: number]: string
}

export default function createSortingInputSchema<T extends EnumLike> (membersEnum: T): ZodObject<any> {
  return z.object({
    sortBy: z.nativeEnum(membersEnum),
    sortWay: z.nativeEnum(SortingWayEnum)
  })
}
