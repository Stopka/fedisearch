import { ElasticClient } from '../../../lib/storage/ElasticClient'

type Context = {
    elasticClient: ElasticClient
    defaultPaging: {
        limit: 20
    }
}

export default Context
