import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { StatsResponse, StatsResponseSoftware } from '../../types/StatsResponse'
import { cache } from '../../lib/cache'
import { statsRequestSchema } from '../../types/StatsRequest'

interface StatsItem {
    softwarename: string | null,
    nodecount: number,
    accountcount: number,
    channelcount: number,
    newnodescount: number
}

const CACHE_KEY = 'stats'

const handleGetStats = async (req: NextApiRequest, res: NextApiResponse<StatsResponse>): Promise<void> => {
  const query = await statsRequestSchema.parseAsync(req.query)
  query.sortBy = query.sortBy ?? 'nodeCount'
  query.sortWay = query.sortWay ?? 'desc'
  const cacheKey = `${CACHE_KEY}_${query.sortWay}_${query.sortBy}`
  if (!cache.has(cacheKey)) {
    console.info('Retrieving new stats', { cacheKey, query })
    const data = await prisma.$queryRawUnsafe<StatsItem[]>(`
          select n."softwareName" as softwarename,
                 count(n.id)      as nodecount,
                 (
                     select count("Feed".id)
                     from "Feed"
                              join "Node" on "Feed"."nodeId" = "Node".id and "Node"."softwareName" = n."softwareName"
                     where "Feed".type = 'account'
                 )                as accountcount,
                 (
                     select count("Feed".id)
                     from "Feed"
                              join "Node" on "Feed"."nodeId" = "Node".id and "Node"."softwareName" = n."softwareName"
                     where "Feed".type = 'channel'
                 )                as channelcount,
                 (
                     select count("Node".id)
                     from "Node"
                     where "Node"."refreshedAt" IS Null
                       and "Node"."softwareName" = n."softwareName"
                 )                as newnodescount
          from "Node" n
          group by n."softwareName"
          having count(n.id) > 1
          order by ${query.sortBy.toLowerCase() + ' ' + query.sortWay.toUpperCase()};
      `)
    cache.set<StatsResponse>(cacheKey, {
      softwares: data.map(
        (item: StatsItem): StatsResponseSoftware => {
          return {
            name: item.softwarename,
            nodeCount: item.nodecount,
            accountCount: item.accountcount,
            channelCount: item.channelcount,
            newNodeCount: item.newnodescount
          }
        }
      )
    }, parseInt(process.env.STATS_CACHE_MINUTES ?? '60') * 60 * 1000)
  }
  console.info('Returning stats from cache', { cacheKey, query })
  res.status(200)
    .json(cache.get<StatsResponse>(cacheKey))
}

export default handleGetStats
