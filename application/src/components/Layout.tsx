import React, { useEffect } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import getMatomo from '../lib/getMatomo'
import { UserOptions } from '@datapunt/matomo-tracker-js/es/types'
import NavItem from './NavItem'

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
            <header>
                <h1><a href={'/'}>FediSearch</a></h1>
                <a href={'/'} className={'logo'}>
                    <img
                        src="/fedisearch.svg"
                        alt={'FediSearch logo'}
                    />
                </a>
            </header>
            <nav>
                <ul>
                    <NavItem path={'/feeds'} label={'Search people'} icon={(
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                             className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512">
                            <path fill="currentColor"
                                  d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                        </svg>
                    )} />
                    <NavItem path={'/nodes'} label={'Search servers'} icon={(
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="server"
                             className="svg-inline--fa fa-server fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"/>
                        </svg>
                    )} />
                    <NavItem path={'/stats'} label={'Index stats'} icon={(

                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-pie"
                             className="svg-inline--fa fa-chart-pie fa-w-17" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512">
                            <path fill="currentColor"
                                  d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"/>
                        </svg>
                    )} />
                </ul>
            </nav>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
  )
}

export default Layout
