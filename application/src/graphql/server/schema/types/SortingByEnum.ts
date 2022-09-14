import { NexusEnumTypeDef } from 'nexus/dist/definitions/enumType'
import { enumType } from 'nexus'

export const createSortingByEnum = (name:string, members:readonly [string, ...string[]]):NexusEnumTypeDef<string> => {
  return enumType({
    name: name,
    members: members
  })
}
