import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import axios from 'axios'
import { StatsResponse, statsResponseSchema } from '../types/StatsResponse'
import SoftwareBadge from '../components/badges/SoftwareBadge'
import ProgressBar from '../components/ProgressBar'
import { StatsRequestSortBy } from '../types/StatsRequest'
import SortToggle from '../components/SortToggle'
import getMatomo from '../lib/getMatomo'
import { Sort } from '../types/Sort'

let source = axios.CancelToken.source()

const Stats: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [sort, setSort] = useState<Sort>({
    sortBy: 'nodeCount', sortWay: 'desc'
  })

  const toggleSort = (sortBy: StatsRequestSortBy) => {
    const sortWay = sort.sortBy === sortBy && sort.sortWay === 'asc' ? 'desc' : 'asc'
    getMatomo(matomoConfig).trackEvent({
      category: 'stats',
      action: 'sort',
      customDimensions: [
        {
          value: `${sortBy} ${sortWay}`,
          id: 2
        }
      ]
    })
    setSort({
      sortBy: sortBy,
      sortWay: sortWay
    })
  }

  const retrieveStats = async () => {
    console.info('Retrieving stats', { sort })
    source = axios.CancelToken.source()
    setLoading(true)
    try {
      const response = await axios.get('/api/stats', {
        params: sort,
        cancelToken: source.token
      })
      const stats = await statsResponseSchema.parseAsync(response.data)
      setStats(stats)
    } catch (err) {
      setStats(null)
      console.log(err)
    }
    setLoaded(true)
    setLoading(false)
  }

  const loadStats = async () => {
    console.info('Cancelling retrivals')
    source.cancel('New query on the way')
    setTimeout(retrieveStats)
  }
  useEffect(() => {
    loadStats()
  }, [sort])
  const sum = {
    nodeCount: 0,
    accountCount: 0,
    channelCount: 0
  }
  const max = {
    nodeCount: 0,
    accountCount: 0,
    channelCount: 0
  }
  const softwares = stats === null ? [] : stats.softwares
  softwares.forEach(software => {
    if (software.name === null) {
      return
    }
    sum.nodeCount += software.nodeCount
    sum.accountCount += software.accountCount
    sum.channelCount += software.channelCount
    max.nodeCount = Math.max(software.nodeCount, max.nodeCount)
    max.accountCount = Math.max(software.accountCount, max.accountCount)
    max.channelCount = Math.max(software.channelCount, max.channelCount)
  })
  return (
        <Layout matomoConfig={matomoConfig}>
            <Head>
                <title>{'Stats | ' + siteTitle}</title>
            </Head>
            <h1>Index stats</h1>
            <table>
                <thead>
                <tr>
                    <th>
                        <SortToggle onToggle={toggleSort} field={'softwareName'} sort={sort}>
                            Software name
                        </SortToggle>
                    </th>
                    <th className={'number-cell'}>
                        <SortToggle onToggle={toggleSort} field={'nodeCount'} sort={sort}>
                            Instance count
                        </SortToggle>
                    </th>
                    <th className={'number-cell'}>
                        <SortToggle onToggle={toggleSort} field={'accountCount'} sort={sort}>
                            Account count
                        </SortToggle>
                    </th>
                    <th className={'number-cell'}>
                        <SortToggle onToggle={toggleSort} field={'channelCount'} sort={sort}>
                            Channel count
                        </SortToggle>
                    </th>
                </tr>
                </thead>
                <Loader loading={loading} hideContent={!loaded} table={4} showTop={true}>
                    {stats === null
                      ? (<tr><td colSpan={4}><em>Failed to load stats data!</em></td></tr>)
                      : (
                          <>
                              <tbody>
                              {
                                  stats.softwares.map((software, index) => {
                                    return software.name !== null
                                      ? (
                                              <tr key={index}>
                                                  <td>
                                                      <SoftwareBadge softwareName={software.name}/>
                                                  </td>
                                                  <td className={'number-cell'}>
                                                      <span>{software.nodeCount}</span>
                                                      <ProgressBar way={'left'}
                                                                   percents={100 * software.nodeCount / max.nodeCount}/>
                                                  </td>
                                                  <td className={'number-cell'}>
                                                      <span>{software.accountCount}</span>
                                                      <ProgressBar way={'left'}
                                                                   percents={100 * software.accountCount / max.accountCount}/>
                                                  </td>
                                                  <td className={'number-cell'}>
                                                      <span>{software.channelCount}</span>
                                                      <ProgressBar way={'left'}
                                                                   percents={100 * software.channelCount / max.channelCount}/>
                                                  </td>
                                              </tr>
                                        )
                                      : (
                                              <tr key={index}>
                                                  <td><em>Not recognized</em></td>
                                                  <td className={'number-cell'}><span>{software.nodeCount}</span></td>
                                                  <td className={'number-cell'}><span>{software.accountCount}</span>
                                                  </td>
                                                  <td className={'number-cell'}><span>{software.channelCount}</span>
                                                  </td>
                                              </tr>
                                        )
                                  })
                              }
                              </tbody>
                              <tfoot>
                              <tr>
                                  <th>Summary</th>
                                  <th className={'number-cell'}>{sum.nodeCount}</th>
                                  <th className={'number-cell'}>{sum.accountCount}</th>
                                  <th className={'number-cell'}>{sum.channelCount}</th>
                              </tr>
                              </tfoot>
                          </>
                        )
                    }
                </Loader>
            </table>
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
