import { objectType } from 'nexus'
import { SortingWay } from './SortingWay'

export const Sorting = objectType({
  name: 'Sorting',
  definition: (t) => {
    t.nonNull.string('by')
    t.nonNull.field('way', {
      type: SortingWay
    })
  }
})
