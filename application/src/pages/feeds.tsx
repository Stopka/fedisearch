import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { feedResponseSchema } from '../types/FeedResponse'
import Loader from '../components/Loader'
import FeedResults from '../components/FeedResults'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import getMatomo from '../lib/getMatomo'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'

let source = axios.CancelToken.source()

const Feeds: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const search = async () => {
    setLoading(true)
    try {
      console.info('Retrieving results', { query, page })
      source = axios.CancelToken.source()
      const response = await axios.get('/api/feed', {
        params: { search: query, page },
        cancelToken: source.token
      })
      const responseData = await feedResponseSchema.parseAsync(response.data)
      setHasMore(responseData.hasMore)
      setResults([
        ...(page > 0 ? results : []),
        ...responseData.feeds
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
    if (query.length < 1) {
      console.info('Query too short.')
      return
    }
    console.info('Loading new query search', { query, page })
    setLoading(true)
    setTimeout(search)
    getMatomo(matomoConfig).trackEvent({
      category: 'feeds',
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
      category: 'feeds',
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

  useEffect(loadNewQueryResults, [query, submitted])
  useEffect(loadNextPageResults, [page])

  return (
        <Layout matomoConfig={matomoConfig}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>People</h1>
            <form onSubmit={handleSearchSubmit}>
                <div className="input-group mb-3">
                    <input
                        name={'query'}
                        id={'query'}
                        type={'search'}
                        onChange={handleQueryChange}
                        onBlur={handleQueryChange}
                        value={query}
                        placeholder={'Search people on Fediverse'}
                        className="form-control"
                        autoFocus={true}
                        aria-label="Search people on Fediverse"
                        aria-describedby="search-button"
                    />
                    <button type={'submit'} id={'search-button'} className={'btn btn-primary'}>
                        <FontAwesomeIcon icon={faSearch} className={'margin-right'}/>
                        <span>Search</span>
                    </button>
                </div>
            </form>

            <Loader loading={loading} showBottom={true}>
                {
                    loaded
                      ? <FeedResults feeds={results}/>
                      : ''
                }
            </Loader>
            {hasMore && !loading
              ? (
                    <div className={'d-flex justify-content-center'}>
                        <button className={'btn btn-secondary'} onClick={handleLoadMore}>
                            <FontAwesomeIcon icon={faAngleDoubleDown} className={'margin-right'}/>
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

export default Feeds
