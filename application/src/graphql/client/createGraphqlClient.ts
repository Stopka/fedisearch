import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import GraphqlConfig from '../../config/GraphqlConfig.js'

export default function createGraphqlClient (config: GraphqlConfig): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri: config.url,
    cache: new InMemoryCache()
  })
}
