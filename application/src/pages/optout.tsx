import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect } from 'react'
import getMatomo from '../lib/getMatomo'

const OptOut: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  useEffect(() => {
    getMatomo(matomoConfig).trackEvent({
      category: 'optout',
      action: 'view'
    })
  }, [])

  return (
        <Layout matomoConfig={matomoConfig}>
            <Head>
                <title>{'Opt out | ' + siteTitle}</title>
            </Head>
            <h1>Opt out</h1>
            <p>You don&apos;t want to be listed here? There are several ways to opt-out from our index:</p>
            <ul>
                <li>
                    On Mastodon you can set noindex option in your profile.
                    Head to <em>Preferences</em>➡<em>Other</em> and check the option labeled as <em>Opt-out of search engine indexing</em>
                </li>
                <li>
                    On Mastodon you can remove yourself from data offered by your instance&apos;s API.
                    Head to <em>Preferences</em>➡<em>Preferences</em> and uncheck the option labeled as <em>Suggest account to others</em>
                </li>
                <li>
                    You can add <strong>#noindex</strong> tag to your profile description
                </li>

                <li>
                    If you are a server maintainer, you can disable crawling of your instance using <em>robots.txt</em>.
                    Just expose a textfile on your instance&apos;s domain, on path <em>https://&lt;your instace&apos;s domain&gt;/robots.txt</em><br/><br/>
                    <pre><code>
                        User-agent: FediCrawl/1.0<br/>
                        Disallow: /
                    </code></pre>
                </li>
            </ul>
        </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.info('Loading matomo config', matomoConfig)
  return {
    props: {
      matomoConfig
    }
  }
}

export default OptOut
