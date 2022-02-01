import prisma from '../../lib/prisma'
import { pageLimit } from '../../lib/pageLimit'
import { NextApiRequest, NextApiResponse } from 'next'
import { nodeRequestSchema } from '../../types/NodeRequest'
import { NodeResponse } from '../../types/NodeResponse'

const handleFeedSearch = async (req: NextApiRequest, res: NextApiResponse<NodeResponse>): Promise<void> => {
  console.info('Searching nodes', { query: req.query })

  const nodeRequest = nodeRequestSchema.parse(req.query)
  const phrases = (nodeRequest.search ?? '').trim().split(/[\s+]+/)
  nodeRequest.sortBy = nodeRequest.sortBy ?? 'refreshedAt'
  nodeRequest.sortWay = nodeRequest.sortWay ?? 'desc'
  const order = {}
  order[nodeRequest.sortBy] = nodeRequest.sortWay
  const nodes = await prisma.node.findMany({
    where: {
      AND: phrases.map(phrase => {
        return {
          OR: [
            {
              domain: {
                contains: phrase,
                mode: 'insensitive'
              }
            },
            {
              softwareName: {
                contains: phrase,
                mode: 'insensitive'
              }
            }
          ]
        }
      }),
      NOT: {
        softwareName: null
      }
    },
    take: pageLimit + 1,
    skip: (nodeRequest.page ?? 0) * pageLimit,
    orderBy: [order]
  })

  res.status(200)
    .json({
      hasMore: typeof nodes[pageLimit] !== 'undefined',
      nodes: nodes.slice(0, pageLimit).map(node => {
        return {
          softwareName: node.softwareName,
          softwareVersion: node.softwareVersion,
          totalUserCount: node.totalUserCount,
          monthActiveUserCount: node.monthActiveUserCount,
          halfYearActiveUserCount: node.halfYearActiveUserCount,
          statusesCount: node.statusesCount,
          openRegistrations: node.openRegistrations,
          refreshedAt: node.refreshedAt ? node.refreshedAt.toISOString() : null,
          domain: node.domain
        }
      })
    })
}

export default handleFeedSearch
