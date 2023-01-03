import React, { ReactElement } from 'react'
import NodeSearch from '../../components/node/NodeSearch'
import Layout from '../../components/server/Layout'
import Stats from "../../components/stats/Stats";
import createConfig from '../../config/createConfig'

export default async function Page (): Promise<ReactElement> {
  const clientConfig = createConfig().get('client')
  return (
        <Layout title={'Stats'} description={'Fediverse stats'} config={clientConfig}>
            <Stats />
        </Layout>
  )
}
