import { inputObjectType } from 'nexus'

export const FeedQueryInput = inputObjectType({
  name: 'FeedQueryInput',
  definition: (t) => {
    t.nonNull.string('search', { default: '' })
  }
})
