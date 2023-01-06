import React, { ReactElement } from 'react'
import NodeSearch from '../../components/node/NodeSearch'
import Layout from '../../components/server/Layout'
import createConfig from '../../config/createConfig'

export default async function Page (): Promise<ReactElement> {
  const clientConfig = createConfig().get('client')
  return (
        <Layout title={'Servers'} config={clientConfig}>
            <NodeSearch />
        </Layout>
  )
}
