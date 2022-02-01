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

let source = axios.CancelToken.source()

const Nodes:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
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
          <label htmlFor={'query'}>Search on fediverse</label>
          <input
              name={'query'}
              id={'query'}
              type={'search'}
              onChange={handleQueryChange}
              onBlur={handleQueryChange}
              value={query}
              placeholder={'Search on fediverse'}
              autoFocus={true}
          />
          <button type={'submit'}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search"
                 className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
              <path fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
              <title>Search</title>
            </svg>
            <span>Search</span>
          </button>
        </form>
          <Loader loading={loading} showBottom={true}>
            {
              loaded
                ? (
                      <table>
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
                          <th className={'number-cell'}>
                            <SortToggle onToggle={toggleSort} field={'totalUserCount'} sort={sort}>
                              Total
                            </SortToggle>
                          </th>
                          <th className={'number-cell'}>
                            <SortToggle onToggle={toggleSort} field={'monthActiveUserCount'} sort={sort}>
                              Month active
                            </SortToggle>
                          </th>
                          <th className={'number-cell'}>
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
                               <div title={'Name'}><SoftwareBadge softwareName={node.softwareName}/></div>
                               <div title={'Version'}>{node.softwareVersion ?? ''}</div></td>
                             <td className={'number-cell'}>{node.totalUserCount ?? '?'}</td>
                             <td className={'number-cell'}>{node.monthActiveUserCount ?? '?'}</td>
                             <td className={'number-cell'}>{node.halfYearActiveUserCount ?? '?'}</td>
                             <td className={'number-cell'}>{node.statusesCount ?? '?'}</td>
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
                  )
                : ''
            }
          </Loader>
        {hasMore && !loading
          ? (
                <button className={'next-page'} onClick={handleLoadMore}>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-down"
                       className="svg-inline--fa fa-angle-double-down fa-w-10" role="img"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="currentColor"
                          d="M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z"/>
                  </svg>
                  <span>Load more</span>
                </button>
            )
          : ''}
      </Layout>
  )
}

export const getServerSideProps:GetServerSideProps = async (context) => {
  console.info('Loading matomo config', matomoConfig)
  return {
    props: {
      matomoConfig
    }
  }
}

export default Nodes
