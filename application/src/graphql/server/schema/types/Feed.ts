import { objectType } from 'nexus'
import { FeedType } from './FeedType'
import { Field } from './Field'
import { Node } from './Node'
import FeedSource from '../../../../lib/storage/Definitions/Feed'
import NodeSource from '../../../../lib/storage/Definitions/Node'
import { Context } from '../../context'
import feedIndex from '../../../../lib/storage/Definitions/feedIndex'
import getFeedId from '../../../../lib/getNodeId'
import nodeIndex from '../../../../lib/storage/Definitions/nodeIndex'
import { DateTime } from './DateTime'

export const Feed = objectType({
  name: 'Feed',
  definition: (t) => {
    t.nonNull.id('id', {
      resolve: async (source: FeedSource) => {
        return getFeedId(source.name, source.domain)
      }
    })
    t.nonNull.string('domain')
    // @ts-ignore
    t.nonNull.field('foundAt', { type: DateTime })
    t.nullable.field('refreshedAt', { type: DateTime })
    t.nonNull.string('name')
    t.nonNull.string('displayName')
    t.nonNull.string('description')
    t.nullable.int('followersCount')
    t.nullable.int('followingCount')
    t.nullable.int('statusesCount')
    t.nullable.int('statusesCount')
    t.nullable.field('lastStatusAt', { type: DateTime })
    t.nullable.field('createdAt', { type: DateTime })
    t.nullable.boolean('bot')
    t.nonNull.boolean('locked')
    t.nonNull.string('url')
    t.nullable.string('avatar')
    t.nonNull.field('type', {
      type: FeedType
    })
    t.nullable.field('parent', {
      type: Feed,
      resolve: async (source: FeedSource, args, { elasticClient }: Context) => {
        if (!source.parentFeedName || !source.parentFeedDomain) {
          return null
        }
        const parentFeedResult = await elasticClient.get<FeedSource>({
          index: feedIndex,
          id: getFeedId(source.parentFeedName, source.parentFeedDomain)
        })
        return parentFeedResult._source
      }
    })
    t.nonNull.list.nonNull.field('fields', {
      type: Field
    })
    t.nonNull.field('node', {
      type: Node,
      resolve: async (source: FeedSource, args, { elasticClient }:Context) => {
        const nodeResult = await elasticClient.get<NodeSource>({
          index: nodeIndex,
          id: source.domain
        })
        return nodeResult._source
      }
    })
  }
})
