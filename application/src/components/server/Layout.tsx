import React, { ReactElement, ReactNode } from 'react'
import ClientConfig from '../../config/ClientConfig'
import 'server-only'
import ClientLayout from '../layout/ClientLayout'
import ClientProviders from '../layout/ClientProviders'

export default function Layout ({
  children,
  config,
  title
}: {
  children?: ReactNode
  config: ClientConfig
  title: string
}): ReactElement {
  return (
    <ClientProviders config={config}>
      <ClientLayout title={title}>
        {children}
      </ClientLayout>
    </ClientProviders>
  )
}
