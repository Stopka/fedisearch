import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import getMatomo from '../lib/getMatomo'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { NodeResponseItem, nodeResponseSchema } from '../types/NodeResponse'
import SoftwareBadge from '../components/badges/SoftwareBadge'
import SortToggle from '../components/SortToggle'
import { faSearch, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { NodeRequestQuery, nodeRequestQuerySchema, NodeRequestSortBy } from '../types/NodeRequest'

let source = axios.CancelToken.source()

const Nodes: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const router = useRouter()
  const routerQuery = nodeRequestQuerySchema.parse(router.query)
  console.log('Router query', routerQuery)
  const [query, setQuery] = useState<NodeRequestQuery>(routerQuery)
  const [submitted, setSubmitted] = useState<Date|null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [results, setResults] = useState<NodeResponseItem[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const search = async () => {
    setLoading(true)
    try {
      console.info('Retrieving results', { query, page })
      source = axios.CancelToken.source()
      const response = await axios.get('/api/node', {
        params: { ...query, page },
        cancelToken: source.token
      })
      const responseData = await nodeResponseSchema.parseAsync(response.data)
      setHasMore(responseData.hasMore)
      setResults([
        ...(page > 0 ? results : []),
        ...responseData.nodes
      ])
      setLoaded(true)
    } catch (e) {
      console.warn('Search failed', e)
      setLoaded(true)
    }
    setLoading(false)
  }

  const loadNewQueryResults = () => {
    console.info('Cancelling searches')
    source.cancel('New query on the way')
    router.push({ query })
    setResults([])
    setHasMore(false)
    setLoaded(false)
    console.info('Loading new query search', { query, page })
    setLoading(true)
    setTimeout(search)
    getMatomo(matomoConfig).trackEvent({
      category: 'nodes',
      action: 'new-search'
    })
  }

  const loadNextPageResults = () => {
    setHasMore(false)
    if (page === 0) {
      return
    }
    console.info('Loading next page', { query, page })
    setTimeout(search)
    getMatomo(matomoConfig).trackEvent({
      category: 'nodes',
      action: 'next-page',
      customDimensions: [
        {
          value: page.toString(),
          id: 1
        }
      ]
    })
  }

  const handleQueryChange = (event) => {
    const targetInput = event.target
    const value = targetInput.value
    const name = targetInput.name
    const newQuery:NodeRequestQuery = { ...query }
    newQuery[name] = value
    console.info('Query changed', { name, value })
    setQuery(newQuery)
    setPage(0)
  }

  const handleSearchSubmit = event => {
    event.preventDefault()
    setQuery(query)
    setSubmitted(new Date())
    setPage(0)
  }

  const handleLoadMore = event => {
    event.preventDefault()
    setPage(page + 1)
  }

  const toggleSort = (sortBy: NodeRequestSortBy) => {
    const sortWay = query.sortBy === sortBy && query.sortWay === 'asc' ? 'desc' : 'asc'
    getMatomo(matomoConfig).trackEvent({
      category: 'nodes',
      action: 'sort',
      customDimensions: [
        {
          value: `${sortBy} ${sortWay}`,
          id: 2
        }
      ]
    })
    const newQuery:NodeRequestQuery = { ...query }
    newQuery.sortBy = sortBy
    newQuery.sortWay = sortWay
    setQuery(newQuery)
  }

  useEffect(loadNewQueryResults, [query, submitted])
  useEffect(loadNextPageResults, [page])

  return (
        <Layout matomoConfig={matomoConfig}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>Search servers</h1>
            <form onSubmit={handleSearchSubmit}>
                <div className={'input-group mb-3'}>
                    <input
                        name={'search'}
                        id={'search'}
                        type={'search'}
                        className={'form-control'}
                        onChange={handleQueryChange}
                        onBlur={handleQueryChange}
                        value={query.search}
                        placeholder={'Search servers on fediverse'}
                        autoFocus={true}
                        aria-label="Search servers on fediverse"
                        aria-describedby="search-nodes-button"
                    />
                    <button type={'submit'} className={'btn btn-primary'} id={'search-nodes-button'}>
                        <FontAwesomeIcon icon={faSearch}/>
                        <span>Search</span>
                    </button>
                </div>
            </form>
            <Loader loading={loading} showBottom={true}>
                {
                    loaded
                      ? (
                            <div className="table-responsive">
                                <table className={'table table-dark table-striped table-bordered nodes'}>
                                    <thead>
                                    <tr>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'domain'} sort={query}>
                                                Domain
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'softwareName'} sort={query}>
                                                Software
                                            </SortToggle>
                                        </th>
                                        <th colSpan={3}>User count</th>
                                        <th rowSpan={2} className={'number-cell'}>
                                            <SortToggle onToggle={toggleSort} field={'statusesCount'} sort={query}>
                                                Statuses
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'openRegistrations'} sort={query}>
                                                Registrations
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'refreshedAt'} sort={query}>
                                                Last refreshed
                                            </SortToggle>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'totalUserCount'} sort={query}>
                                                Total
                                            </SortToggle>
                                        </th>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'monthActiveUserCount'} sort={query}>
                                                Month active
                                            </SortToggle>
                                        </th>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'halfYearActiveUserCount'} sort={query}>
                                                Half year active
                                            </SortToggle>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {results.length
                                      ? results.map((node, index) => {
                                        return (
                                                <tr key={index}>
                                                    <td>{node.domain}</td>
                                                    <td>
                                                        <div title={'Name'}><SoftwareBadge
                                                            softwareName={node.softwareName}/></div>
                                                        <div title={'Version'}>{node.softwareVersion ?? ''}</div>
                                                    </td>
                                                    <td className={'text-end'}>{node.totalUserCount ?? '?'}</td>
                                                    <td className={'text-end'}>{node.monthActiveUserCount ?? '?'}</td>
                                                    <td className={'text-end'}>{node.halfYearActiveUserCount ?? '?'}</td>
                                                    <td className={'text-end'}>{node.statusesCount ?? '?'}</td>
                                                    <td>{node.openRegistrations === null ? '?' : (node.openRegistrations ? 'Opened' : 'Closed')}</td>
                                                    <td>{node.refreshedAt ? (new Date(node.refreshedAt)).toLocaleDateString() : 'Never'}</td>
                                                </tr>
                                        )
                                      })
                                      : (
                                            <tr>
                                                <td colSpan={9}>No servers found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )
                      : ''
                }
            </Loader>
            {hasMore && !loading
              ? (
                  <div className={'d-flex justify-content-center'}>
                    <button className={'btn btn-secondary'} onClick={handleLoadMore}>
                        <FontAwesomeIcon icon={faAngleDoubleDown} className={'margin-right'} />
                        <span>Load more</span>
                    </button>
                  </div>
                )
              : ''}
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

export default Nodes
