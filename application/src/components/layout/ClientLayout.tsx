'use client'
import React, { ReactElement, ReactNode, useEffect } from 'react'
import { useMatomo } from '../../hooks/MatomoHook'

export default function ClientLayout ({
  children,
  title
}: {
  children?: ReactNode
  title: string
}): ReactElement {
  const matomo = useMatomo()
  useEffect(() => {
    matomo.trackPageView()
  }, [])
  return (
      <div className={'container'}>
          <h1>{title}</h1>
          {children}
      </div>
  )
}
