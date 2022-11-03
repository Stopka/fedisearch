import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

export default function createGraphqlClient (): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache()
  })
}
