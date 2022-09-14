import { objectType } from 'nexus'

export const Stats = objectType({
  name: 'Stats',
  definition: (t) => {
    t.nonNull.string('softwareName')
    t.nonNull.int('nodeCount')
    t.nonNull.int('accountFeedCount')
    t.nonNull.int('channelFeedCount')
  }
})
