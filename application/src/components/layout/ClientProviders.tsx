'use client'

import { ApolloProvider } from '@apollo/client'
import React, { ReactElement, ReactNode } from 'react'
import ClientConfig from '../../config/ClientConfig'
import createGraphqlClient from '../../graphql/client/createGraphqlClient'
import { MatomoProvider } from '../../hooks/MatomoHook'
import createMatomo from '../../matomo/createMatomo'

export default function ClientProviders ({
  children, config
}: {
  children: ReactNode
  config: ClientConfig
}): ReactElement {
  return (
        <ApolloProvider client={createGraphqlClient(config.graphql)}>
            <MatomoProvider matomo={createMatomo(config.matomo)}>
                {children}
            </MatomoProvider>
        </ApolloProvider>
  )
}
