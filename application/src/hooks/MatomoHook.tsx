'use client'
import MatomoTracker from '@datapunt/matomo-tracker-js'
import React, { ReactElement, ReactNode, useContext } from 'react'

const MatomoContext = React.createContext<MatomoTracker | undefined>(undefined)

export const MatomoProvider = ({ children, matomo }: { children: ReactNode, matomo: MatomoTracker }): ReactElement => {
  return (
      <MatomoContext.Provider value={matomo}>
        {children}
      </MatomoContext.Provider>
  )
}

export const useMatomo = (): MatomoTracker => {
  const matomo = useContext(MatomoContext)
  if (undefined === matomo) {
    throw new Error('Missing Matomo provider')
  }
  return matomo
}
