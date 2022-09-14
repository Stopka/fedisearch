import { arg, extendType, nonNull } from 'nexus'
import { NodeQueryInput, PagingInput, NodeList } from '../types'
import { Context } from '../../context'
import Node from '../../../../lib/storage/Definitions/Node'
import nodeIndex from '../../../../lib/storage/Definitions/nodeIndex'
import { ListNodesVariables } from '../../../common/queries/listNodes'
import prepareSimpleQuery from '../../../../lib/prepareSimpleQuery'

export const listNodes = extendType({
  type: 'Query',
  definition (t) {
    t.field('listNodes', {
      type: NodeList,
      args: {
        paging: arg({
          type: nonNull(PagingInput),
          default: { page: 0 }
        }),
        query: arg({
          type: nonNull(NodeQueryInput),
          default: { default: '', sortBy: 'refreshedAt', sortWay: 'desc' }
        })
      },
      resolve: async (event, { paging, query }:ListNodesVariables, { elasticClient, defaultPaging }: Context) => {
        console.info('Searching nodes', { paging, query })

        const results = await elasticClient.search<Node>({
          index: nodeIndex,
          query: {
            bool: {
              must: [
                {
                  exists: {
                    field: query.sortBy
                  }
                },
                {
                  exists: {
                    field: 'softwareName'
                  }
                }
              ],
              should: query.search !== ''
                ? [
                    {
                      wildcard: {
                        softwareName: {
                          value: `*${query.search}*`,
                          boost: 1
                        }
                      }
                    },
                    {
                      wildcard: {
                        softwareVersion: {
                          value: `*${query.search}*`,
                          boost: 1
                        }
                      }
                    },
                    {
                      wildcard: {
                        domain: {
                          value: `*${query.search}*`,
                          boost: 2
                        }
                      }
                    },
                    {
                      simple_query_string: {
                        query: prepareSimpleQuery(query.search),
                        fields: [
                          'softwareName^1',
                          'version^1',
                          'domain^2'
                        ],
                        default_operator: 'AND'
                      }
                    }
                  ]
                : [{ match_all: {} }],
              minimum_should_match: 1
            }
          },
          size: defaultPaging.limit + 1,
          from: paging.page * defaultPaging.limit,
          sort: `${query.sortBy}:${query.sortWay}`
        })

        return {
          paging: {
            hasNext: typeof results.hits.hits[defaultPaging.limit] !== 'undefined'
          },
          items: results.hits.hits.slice(0, defaultPaging.limit).map(node => {
            return node._source
          })
        }
      }
    })
  }
})
