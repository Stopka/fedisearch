import { Paging } from './Paging'
import { Node } from './Node'
import { objectType } from 'nexus'

export const NodeList = objectType({
  name: 'NodeList',
  definition: (t) => {
    t.nonNull.field('paging', { type: Paging })
    t.nonNull.list.nonNull.field('items', { type: Node })
  }
})
