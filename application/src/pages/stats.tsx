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
import { StatsRequest, statsRequestSchema, StatsRequestSortBy } from '../types/StatsRequest'
import SortToggle from '../components/SortToggle'
import getMatomo from '../lib/getMatomo'
import { useRouter } from 'next/router'

let source = axios.CancelToken.source()

const Stats: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const router = useRouter()
  const routerQuery = statsRequestSchema.parse(router.query)
  console.log('Router query', routerQuery)
  const [query, setQuery] = useState<StatsRequest>(routerQuery)
  const [loading, setLoading] = useState<boolean>(true)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [stats, setStats] = useState<StatsResponse | null>(null)

  const toggleSort = (sortBy: StatsRequestSortBy) => {
    const sortWay = query.sortBy === sortBy && query.sortWay === 'asc' ? 'desc' : 'asc'
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
    const newQuery:StatsRequest = { ...query }
    newQuery.sortBy = sortBy
    newQuery.sortWay = sortWay
    setQuery(newQuery)
  }

  const retrieveStats = async () => {
    console.info('Retrieving stats', { query })
    source = axios.CancelToken.source()
    setLoading(true)
    await router.push({ query })
    try {
      const response = await axios.get('/api/stats', {
        params: query,
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
  }, [query])
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
            <div className="table-responsive">
                <table className={'table table-dark table-striped table-bordered stats'}>
                    <thead>
                    <tr>
                        <th>
                            <SortToggle onToggle={toggleSort} field={'softwareName'} sort={query}>
                                Software name
                            </SortToggle>
                        </th>
                        <th className={'text-end'}>
                            <SortToggle onToggle={toggleSort} field={'nodeCount'} sort={query}>
                                Instance count
                            </SortToggle>
                        </th>
                        <th className={'text-end'}>
                            <SortToggle onToggle={toggleSort} field={'accountCount'} sort={query}>
                                Account count
                            </SortToggle>
                        </th>
                        <th className={'text-end'}>
                            <SortToggle onToggle={toggleSort} field={'channelCount'} sort={query}>
                                Channel count
                            </SortToggle>
                        </th>
                    </tr>
                    </thead>
                    <Loader loading={loading} hideContent={!loaded} table={4} showTop={true}>
                        {stats === null
                          ? (<tr>
                                <td colSpan={4}><em>Failed to load stats data!</em></td>
                            </tr>)
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
                                                        <td className={'text-end'}>
                                                            <span>{software.nodeCount}</span>
                                                            <ProgressBar way={'left'}
                                                                         percents={100 * software.nodeCount / max.nodeCount}/>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.accountCount}</span>
                                                            <ProgressBar way={'left'}
                                                                         percents={100 * software.accountCount / max.accountCount}/>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.channelCount}</span>
                                                            <ProgressBar way={'left'}
                                                                         percents={100 * software.channelCount / max.channelCount}/>
                                                        </td>
                                                    </tr>
                                              )
                                            : (
                                                    <tr key={index}>
                                                        <td><em>Not recognized</em></td>
                                                        <td className={'text-end'}><span>{software.nodeCount}</span>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.accountCount}</span>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.channelCount}</span>
                                                        </td>
                                                    </tr>
                                              )
                                        })
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>Summary</th>
                                        <th className={'text-end'}>{sum.nodeCount}</th>
                                        <th className={'text-end'}>{sum.accountCount}</th>
                                        <th className={'text-end'}>{sum.channelCount}</th>
                                    </tr>
                                    </tfoot>
                                </>
                            )
                        }
                    </Loader>
                </table>
            </div>
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
