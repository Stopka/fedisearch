import React, { useEffect } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import getMatomo from '../lib/getMatomo'
import { UserOptions } from '@datapunt/matomo-tracker-js/es/types'
import NavBar from './NavBar'

export const siteTitle = 'FediSearch'
export const siteDescription = 'Search people on Fediverse'

const Layout: React.FC<{ matomoConfig: UserOptions, children: React.ReactNode }> = ({ matomoConfig, children }) => {
  useEffect(() => {
    getMatomo(matomoConfig).trackPageView()
  }, [])
  return (
        <div className={'container'}>
            <Head>
                <title>{siteTitle}</title>
                <link rel="icon" href="/fedisearch.png"/>
                <meta name="description" content={siteDescription}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta property="og:title" content={siteTitle}/>
                <meta property="og:description" content={siteDescription}/>
                <meta property="og:image" content="/fedisearch.png"/>
                <meta property="og:type" content="website"/>
            </Head>
            <div className="container">
                <NavBar />
                <main>
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
  )
}

export default Layout
