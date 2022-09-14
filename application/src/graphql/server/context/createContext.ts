import elasticClient from '../../../lib/storage/ElasticClient'
import Context from './Context'

export default async function createContext (): Promise<Context> {
  return {
    elasticClient,
    defaultPaging: {
      limit: 20
    }
  }
}
