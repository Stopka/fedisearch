import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import getMatomo from '../lib/getMatomo'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { nodeResponseSchema } from '../types/NodeResponse'
import SoftwareBadge from '../components/badges/SoftwareBadge'
import SortToggle from '../components/SortToggle'
import { StatsRequestSortBy } from '../types/StatsRequest'
import { Sort } from '../types/Sort'
import { faSearch, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let source = axios.CancelToken.source()

const Nodes: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [sort, setSort] = useState<Sort>({
    sortBy: 'refreshedAt', sortWay: 'desc'
  })

  const search = async () => {
    setLoading(true)
    try {
      console.info('Retrieving results', { query, page })
      source = axios.CancelToken.source()
      const response = await axios.get('/api/node', {
        params: { search: query, page, sortBy: sort.sortBy, sortWay: sort.sortWay },
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
    const value = event.target.value
    console.info('Query changed', { query: value })
    setQuery(value)
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

  const toggleSort = (sortBy: StatsRequestSortBy) => {
    const sortWay = sort.sortBy === sortBy && sort.sortWay === 'asc' ? 'desc' : 'asc'
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
    setSort({
      sortBy: sortBy,
      sortWay: sortWay
    })
  }

  useEffect(loadNewQueryResults, [query, submitted, sort])
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
                        name={'query'}
                        id={'query'}
                        type={'search'}
                        className={'form-control'}
                        onChange={handleQueryChange}
                        onBlur={handleQueryChange}
                        value={query}
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
                                            <SortToggle onToggle={toggleSort} field={'domain'} sort={sort}>
                                                Domain
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'softwareName'} sort={sort}>
                                                Software
                                            </SortToggle>
                                        </th>
                                        <th colSpan={3}>User count</th>
                                        <th rowSpan={2} className={'number-cell'}>
                                            <SortToggle onToggle={toggleSort} field={'statusesCount'} sort={sort}>
                                                Statuses
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'openRegistrations'} sort={sort}>
                                                Registrations
                                            </SortToggle>
                                        </th>
                                        <th rowSpan={2}>
                                            <SortToggle onToggle={toggleSort} field={'refreshedAt'} sort={sort}>
                                                Last refreshed
                                            </SortToggle>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'totalUserCount'} sort={sort}>
                                                Total
                                            </SortToggle>
                                        </th>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'monthActiveUserCount'} sort={sort}>
                                                Month active
                                            </SortToggle>
                                        </th>
                                        <th className={'text-end'}>
                                            <SortToggle onToggle={toggleSort} field={'halfYearActiveUserCount'} sort={sort}>
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
