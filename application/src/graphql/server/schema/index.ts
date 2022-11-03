import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types'
import * as queries from './queries'
// eslint-disable-next-line no-unused-vars

const schema = makeSchema({
  types: {
    ...types,
    ...queries
  },
  sourceTypes: {
    modules: [{
      module: join(__dirname, 'sources', 'elastic.ts'),
      alias: 'elastic'
    }]
  },
  outputs: {
    typegen: join(__dirname, 'generated', 'nexus.ts'),
    schema: join(__dirname, 'schema.graphql')
  },
  contextType: {
    export: 'Context',
    module: join(__dirname, 'context', 'index.ts')
  }
})

export default schema
