import React, { useEffect } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import getMatomo from '../lib/getMatomo'
import { UserOptions } from '@datapunt/matomo-tracker-js/es/types'

export const siteTitle = 'FediSearch'

const Layout:React.FC<{ matomoConfig:UserOptions, children: React.ReactNode }> = ({ matomoConfig, children }) => {
  useEffect(() => {
    getMatomo(matomoConfig).trackPageView()
  }, [])
  return (
        <div className={'container'}>
            <Head>
                <link rel="icon" href="/fedisearch.png"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={'/fedisearch.png'}
                />
                <meta name="og:title" content={siteTitle}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <header>
                <h1><a href={'/'}>FediSearch</a></h1>
                <a href={'/'} className={'logo'}>
                    <img
                        src="/fedisearch.svg"
                        alt={'FediSearch logo'}
                    />
                </a>
            </header>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
  )
}

export default Layout
