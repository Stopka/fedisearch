import React, { ReactElement } from 'react'
import FeedSearch from '../../components/feed/FeedSearch'
import Layout from '../../components/server/Layout'
import createConfig from '../../config/createConfig'

export default async function Page (): Promise<ReactElement> {
  const clientConfig = createConfig().get('client')
  return (
      <Layout title={'People'} config={clientConfig}>
        <FeedSearch />
      </Layout>
  )
}
