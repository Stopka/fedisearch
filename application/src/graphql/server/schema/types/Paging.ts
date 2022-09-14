import { objectType } from 'nexus'

export const Paging = objectType({
  name: 'Paging',
  definition: (t) => {
    t.nonNull.boolean('hasNext')
  }
})

export type PagingType = {
  hasNext: boolean
}
