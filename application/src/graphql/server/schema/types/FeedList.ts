import { objectType } from 'nexus'
import { Paging } from './Paging'
import { Feed } from './Feed'

export const FeedList = objectType({
  name: 'FeedList',
  definition: (t) => {
    t.nonNull.field('paging', { type: Paging })
    t.nonNull.list.nonNull.field('items', { type: Feed })
  }
})
