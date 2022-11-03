import '../styles/global.scss'
import { AppProps } from 'next/app'
import React, { ReactElement } from 'react'
import { ApolloProvider } from '@apollo/client'
import createGraphqlClient from '../graphql/client/createGraphqlClient'

const graphqlClient = createGraphqlClient()

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return <ApolloProvider client={graphqlClient}>
        <Component {...pageProps} />
    </ApolloProvider>
}

export default App
