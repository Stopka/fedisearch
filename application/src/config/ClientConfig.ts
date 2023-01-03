import GraphqlConfig from './GraphqlConfig'
import MatomoConfig from './MatomoConfig'

export default interface ClientConfig {
  graphql: GraphqlConfig
  matomo: MatomoConfig
}
