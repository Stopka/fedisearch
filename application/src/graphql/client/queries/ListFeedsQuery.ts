import { gql } from '@apollo/client'
import { List } from '../types/List'

export const ListFeedsQuery = gql`
    query ListFeeds($paging: PagingInput, $query: FeedQueryInput) {
        listFeeds(paging: $paging,query: $query){
            paging {
                hasNext
            },
            items {
                id,
                avatar,
                displayName,
                foundAt,
                bot,
                createdAt,
                description,
                displayName,
                followersCount,
                followingCount,
                lastStatusAt,
                locked,
                name,
                refreshedAt,
                statusesCount,
                type,
                url,
                fields {
                    name,value
                }
                node {
                    domain,
                    foundAt,
                    geoip {
                        city_name,
                        country_iso_code,
                    },
                    halfYearActiveUserCount,
                    id,
                    monthActiveUserCount,
                    name,
                    openRegistrations,
                    refreshAttemptedAt,
                    refreshedAt,
                    softwareName
                },
                parent {
                    id,
                    avatar,
                    displayName
                    name,
                    domain,
                    url
                }
            }
        }
    }
`

export interface ParentFeedItem {
  id: string
  avatar: string
  displayName: string
  name: string
  domain: string
  url: string
}

export interface FeedResultItem {
  id: string
  avatar: string
  displayName: string
  foundAt: string
  bot: boolean
  createdAt: string
  description: string
  followersCount: number
  followingCount: number
  lastStatusAt: string
  locked: boolean
  name: string
  refreshedAt: string
  statusesCount: number
  type: 'account' | 'channel'
  url: string
  fields: Array<{
    name: string
    value: string
  }>
  node: {
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
  }
  parent: ParentFeedItem | null
}

export interface ListFeedsResult {
  listFeeds: List<FeedResultItem>
}
