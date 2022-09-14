import { enumType } from 'nexus'

export const FeedType = enumType({
  name: 'FeedType',
  members: ['account', 'channel']
})
