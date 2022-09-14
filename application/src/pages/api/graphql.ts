import { NextApiRequest, NextApiResponse } from 'next'
import createCorsHandlerAdapter from 'micro-cors'
import createGraphqlServer from '../../graphql/server/createGraphqlServer'

const handleCors = createCorsHandlerAdapter()

const graphqlServer = createGraphqlServer()

const startedServer = graphqlServer.start()

const handler = async (req: NextApiRequest, res: NextApiResponse) :Promise<void> => {
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  await startedServer

  const handleGraphql = await graphqlServer.createHandler({
    path: '/api/graphql'
  })

  await handleGraphql(req, res)
}

export default handleCors(handler)

export const config = {
  api: {
    bodyParser: false
  }
}
