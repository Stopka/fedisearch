import { ApolloServer } from 'apollo-server-micro'
import resolvers from './resolvers'
import schema from './schema'
import { createContext } from './context'

export default function createGraphqlServer () {
  return new ApolloServer({
    schema,
    resolvers,
    context: createContext
  })
}
