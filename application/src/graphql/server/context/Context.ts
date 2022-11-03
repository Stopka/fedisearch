import { ElasticClient } from '../../../lib/storage/ElasticClient'

interface Context {
  elasticClient: ElasticClient
  defaultPaging: {
    limit: 20
  }
}

export default Context
