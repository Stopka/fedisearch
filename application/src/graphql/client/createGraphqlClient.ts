import { ApolloClient, InMemoryCache } from '@apollo/client'

export default function createGraphqlClient () {
  return new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache()
  })
}
