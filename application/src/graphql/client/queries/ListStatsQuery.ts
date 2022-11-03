import { gql } from '@apollo/client'
import { List } from '../types/List'

export const ListStatsQuery = gql`
    query ListStats($query: StatsQueryInput) {
        listStats(query:$query) {
            items {
                softwareName
                nodeCount
                accountFeedCount
                channelFeedCount
            }
        }
    }
`

export interface StatsResultItem {
  softwareName: string
  nodeCount: number
  accountFeedCount: number
  channelFeedCount: number
}

export interface ListStatsResult {
  listStats: List<StatsResultItem>
}
