import { gql } from '@apollo/client'
import { List } from '../types/List'

export const ListNodesQuery = gql`
    query ListNodes($paging: PagingInput, $query: NodeQueryInput) {
        listNodes(paging: $paging,query: $query){
            paging {
                hasNext
            }
            items {
                domain,
                foundAt,
                geoip {
                    city_name,country_iso_code
                },
                halfYearActiveUserCount,
                id,
                monthActiveUserCount,
                accountFeedCount,
                name,
                openRegistrations,
                refreshAttemptedAt,
                refreshedAt,
                serverIps,
                softwareName,
                softwareVersion,
                standardizedSoftwareVersion,
                statusesCount,
                totalUserCount
            }
        }
    }
`

export interface NodeResultItem {
  domain: string
  foundAt: string
  geoip: {
    // eslint-disable-next-line camelcase
    city_name: string
    // eslint-disable-next-line camelcase
    country_iso_code: string
  }
  halfYearActiveUserCount: number
  id: string
  monthActiveUserCount: number
  name: string
  openRegistrations: boolean
  refreshAttemptedAt: string
  refreshedAt: string
  softwareName: string
  softwareVersion: string
  standardizedSoftwareVersion: string
  totalUserCount: number
  statusesCount: number
  accountFeedCount: number
}

export interface ListNodesResult {
  listNodes: List<NodeResultItem>
}
