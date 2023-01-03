import React, { ReactElement, ReactNode } from 'react'
import ClientConfig from '../../config/ClientConfig'
import 'server-only'
import '../../styles/global.scss'
import ClientLayout from '../layout/ClientLayout'
import ClientProviders from '../layout/ClientProviders'

export default function Layout ({
  children,
  config,
  title,
  description
}: {
  children?: ReactNode
  config: ClientConfig
  title: string
  description: string
}): ReactElement {
  console.log('Layout')
  return (
    <ClientProviders config={config}>
      <ClientLayout title={title} description={description}>
        {children}
      </ClientLayout>
    </ClientProviders>
  )
}
