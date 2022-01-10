import prisma from '../../lib/prisma'
import { pageLimit } from '../../lib/pageLimit'
import { feedRequestSchema } from '../../types/FeedRequest'
import { NextApiRequest, NextApiResponse } from 'next'
import { FeedResponse } from '../../types/FeedResponse'

const handleFeedSearch = async (req: NextApiRequest, res: NextApiResponse<FeedResponse>): Promise<void> => {
  console.info('Searching feeds', { query: req.query })

  const feedRequest = feedRequestSchema.parse(req.query)
  const phrases = feedRequest.search.trim().split(/[\s+]+/)
  const feeds = await prisma.feed.findMany({
    where: {
      OR: [
        {
          fulltext: {
            search: phrases.join(' & '),
            mode: 'insensitive'
          }
        },
        {
          AND: phrases.map(phrase => {
            return {
              fulltext: {
                contains: phrase,
                mode: 'insensitive'
              }
            }
          })
        }
      ]
    },
    take: pageLimit + 1,
    skip: (feedRequest.page ?? 0) * pageLimit,
    include: {
      emails: true,
      fields: true,
      node: true
    },
    orderBy: [
      {
        lastStatusAt: 'desc'
      },
      {
        followersCount: 'desc'
      },
      {
        statusesCount: 'desc'
      }
    ]
  })

  res.status(200)
    .json({
      hasMore: typeof feeds[pageLimit] !== 'undefined',
      feeds: feeds.slice(0, pageLimit).map(feed => {
        return {
          avatar: feed.avatar,
          bot: feed.bot,
          createdAt: feed.createdAt.toISOString(),
          description: feed.description,
          displayName: feed.displayName,
          fields: feed.fields.map(field => {
            return {
              name: field.name,
              value: field.value
            }
          }),
          followersCount: feed.followersCount,
          followingCount: feed.followingCount,
          statusesCount: feed.statusesCount,
          lastStatusAt: feed.lastStatusAt?.toISOString() ?? null,
          name: feed.name,
          node: {
            domain: feed.node.domain,
            softwareName: feed.node.softwareName
          },
          type: feed.type,
          url: feed.url,
          parentFeed: null // TODO find parent data
        }
      })
    })
}

export default handleFeedSearch
