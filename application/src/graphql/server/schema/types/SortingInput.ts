import { inputObjectType } from 'nexus'
import { SortingWay } from './SortingWay'
import { NexusEnumTypeDef } from 'nexus/dist/definitions/enumType'
import { InputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks'

export const createSortingInput = (name:string, sortingByEnum:NexusEnumTypeDef<string>, definition:(t:InputDefinitionBlock<string>)=>void, defaultBy:string, defaultWay:'asc'|'desc') => {
  return inputObjectType({
    name: name,
    definition: (t) => {
      t.nullable.field('sortBy', {
        type: sortingByEnum,
        default: defaultBy
      })
      t.nullable.field('sortWay', {
        type: SortingWay,
        default: defaultWay
      })
      definition(t)
    }
  })
}
