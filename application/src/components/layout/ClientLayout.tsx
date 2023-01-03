'use client'
import React, { ReactElement, ReactNode, useEffect } from 'react'
import Head from 'next/head'
import { useMatomo } from '../../hooks/MatomoHook'
import Footer from './Footer'
import NavBar from './NavBar'

export default function ClientLayout ({
  children,
  title,
  description
}: {
  children?: ReactNode
  title: string
  description: string
}): ReactElement {
  const matomo = useMatomo()
  useEffect(() => {
    matomo.trackPageView()
  }, [])
  return (
      <div className={'container'}>
          <Head>
              <title>{title}</title>
              <link rel="icon" href="/fedisearch.png"/>
              <meta name="description" content={description}/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta property="og:title" content={title}/>
              <meta property="og:description" content={description}/>
              <meta property="og:image" content="/fedisearch.png"/>
              <meta property="og:type" content="website"/>
          </Head>
          <div className="container">
              <NavBar />
              <main>
                  <h1>{title}</h1>
                  {children}
              </main>
              <Footer/>
          </div>
      </div>
  )
}
