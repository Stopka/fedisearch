import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import SoftwareBadge from '../components/badges/SoftwareBadge'
import ProgressBar from '../components/ProgressBar'
import SortToggle from '../components/SortToggle'
import getMatomo from '../lib/getMatomo'
import { useRouter } from 'next/router'
import { statsQueryInputSchema, StatsQueryInputType } from '../graphql/common/types/StatsQueryInput'
import { useQuery } from '@apollo/client'
import { ListStatsQuery, ListStatsResult } from '../graphql/client/queries/ListStatsQuery'
import { ListStatsVariables } from '../graphql/common/queries/listStats'
import { StatsSoringByEnumType } from '../graphql/common/types/StatsSortingByEnum'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const Stats: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const router = useRouter()
  let routerQuery
  try {
    routerQuery = statsQueryInputSchema.parse(router.query)
  } catch (e) {
    routerQuery = {
      sortBy: 'nodeCount',
      sortWay: 'desc'
    }
  }
  console.log('Router query', routerQuery)
  const [query, setQuery] = useState<StatsQueryInputType>(routerQuery)
  const { loading, error, data } = useQuery<ListStatsResult, ListStatsVariables>(ListStatsQuery, {
    variables: {
      query
    }
  })

  useEffect(() => {
    router.push({ query })
    getMatomo(matomoConfig).trackEvent({
      category: 'stats',
      action: 'new-search'
    })
  }, [query])

  const toggleSort = (sortBy: StatsSoringByEnumType) => {
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
    setQuery({
      ...query,
      sortBy,
      sortWay
    })
  }

  const sum = {
    nodeCount: 0,
    accountFeedCount: 0,
    channelFeedCount: 0
  }
  const max = {
    nodeCount: 0,
    accountFeedCount: 0,
    channelFeedCount: 0
  }
  if (data) {
    data.listStats.items.forEach(item => {
      if (item.softwareName === null) {
        return
      }
      sum.nodeCount += item.nodeCount
      sum.accountFeedCount += item.accountFeedCount
      sum.channelFeedCount += item.channelFeedCount
      max.nodeCount = Math.max(item.nodeCount, max.nodeCount)
      max.accountFeedCount = Math.max(item.accountFeedCount, max.accountFeedCount)
      max.channelFeedCount = Math.max(item.channelFeedCount, max.channelFeedCount)
    })
  }
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
                            <SortToggle onToggle={toggleSort} field={'accountFeedCount'} sort={query}>
                                Account count
                            </SortToggle>
                        </th>
                        <th className={'text-end'}>
                            <SortToggle onToggle={toggleSort} field={'channelFeedCount'} sort={query}>
                                Channel count
                            </SortToggle>
                        </th>
                    </tr>
                    </thead>
                    <Loader loading={loading} table={4} showTop={true} hideContent={true}>
                        {!data
                          ? (
                                <tbody>
                                <tr>
                                    <td colSpan={4}><em>There are no stats so far!</em></td>
                                </tr>
                                </tbody>)
                          : (
                                <>
                                    <tbody>
                                    {
                                        data.listStats.items.map((software, index) => {
                                          return software.softwareName !== null
                                            ? (
                                                    <tr key={index}>
                                                        <td>
                                                            <SoftwareBadge softwareName={software.softwareName}/>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.nodeCount}</span>
                                                            <ProgressBar way={'left'}
                                                                         percents={100 * software.nodeCount / max.nodeCount}/>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.accountFeedCount}</span>
                                                            <ProgressBar way={'left'}
                                                                         percents={100 * software.accountFeedCount / max.accountFeedCount}/>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.channelFeedCount}</span>
                                                            <ProgressBar way={'left'}
                                                                         percents={100 * software.channelFeedCount / max.channelFeedCount}/>
                                                        </td>
                                                    </tr>
                                              )
                                            : (
                                                    <tr key={index}>
                                                        <td><em>Not recognized</em></td>
                                                        <td className={'text-end'}><span>{software.nodeCount}</span>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.accountFeedCount}</span>
                                                        </td>
                                                        <td className={'text-end'}>
                                                            <span>{software.channelFeedCount}</span>
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
                                        <th className={'text-end'}>{sum.accountFeedCount}</th>
                                        <th className={'text-end'}>{sum.channelFeedCount}</th>
                                    </tr>
                                    </tfoot>
                                </>
                            )
                        }
                    </Loader>
                </table>
                {error
                  ? (<div className={'d-flex justify-content-center'}>
                        <FontAwesomeIcon icon={faExclamationTriangle} className={'margin-right'}/>
                        <span>{error.message}</span>
                    </div>)
                  : ''}
            </div>
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

export default Stats
