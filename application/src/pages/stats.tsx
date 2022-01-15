import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import axios from 'axios'
import { StatsResponse, statsResponseSchema } from '../types/StatsResponse'
import SoftwareBadge from '../components/badges/SoftwareBadge'

const Stats: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [stats, setStats] = useState<StatsResponse|null>(null)

  const loadStats = async () => {
    try {
      const response = await axios.get('/api/stats')
      const stats = await statsResponseSchema.parseAsync(response.data)
      setStats(stats)
    } catch (err) {
      setStats(null)
      console.log(err)
    }
    setLoading(false)
  }
  useEffect(() => {
    loadStats()
  }, [])
  const summary = {
    nodeCount: 0,
    accountCount: 0,
    channelCount: 0
  }
  return (
        <Layout matomoConfig={matomoConfig}>
            <Head>
                <title>{'Stats | ' + siteTitle}</title>
            </Head>
            <h1>Index stats</h1>
            <Loader loading={loading} hideContent={true}>
                {stats === null
                  ? (<p>Failed to load stats data!</p>)
                  : (
                      <>
                      <table>
                            <thead>
                            <tr>
                                <th>Software</th>
                                <th className={'number-cell'}>Instance count</th>
                                <th className={'number-cell'}>Account count</th>
                                <th className={'number-cell'}>Channel count</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                stats.softwares.map((software, index) => {
                                  summary.nodeCount += software.nodeCount
                                  summary.accountCount += software.accountCount
                                  summary.channelCount += software.channelCount
                                  return (
                                        <tr key={index}>
                                            <td>{software.name !== null
                                              ? <SoftwareBadge softwareName={software.name}/>
                                              : <em>Not recognized</em>}</td>
                                            <td className={'number-cell'}>{software.nodeCount}</td>
                                            <td className={'number-cell'}>{software.accountCount}</td>
                                            <td className={'number-cell'}>{software.channelCount}</td>
                                        </tr>
                                  )
                                })
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Summary</th>
                                <th className={'number-cell'}>{summary.nodeCount}</th>
                                <th className={'number-cell'}>{summary.accountCount}</th>
                                <th className={'number-cell'}>{summary.channelCount}</th>
                            </tr>
                            </tfoot>
                        </table>
                      </>
                    )
                }
            </Loader>
        </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.info('Loading matomo config', matomoConfig)
  return {
    props: {
      matomoConfig
    }
  }
}

export default Stats
