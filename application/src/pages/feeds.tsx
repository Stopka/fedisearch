import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FeedResponseItem, feedResponseSchema } from '../types/FeedResponse'
import Loader from '../components/Loader'
import FeedResults from '../components/FeedResults'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import getMatomo from '../lib/getMatomo'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { FeedRequestQuery, feedRequestQuerySchema } from '../types/FeedRequest'

let source = axios.CancelToken.source()

const Feeds: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const router = useRouter()
  const routerQuery = feedRequestQuerySchema.parse(router.query)
  console.log('Router query', routerQuery)
  const [query, setQuery] = useState<FeedRequestQuery>(routerQuery)
  const [submitted, setSubmitted] = useState<Date | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [results, setResults] = useState<FeedResponseItem[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const search = async () => {
    setLoading(true)
    try {
      console.info('Retrieving results', { query, page })
      source = axios.CancelToken.source()
      const response = await axios.get('/api/feed', {
        params: { ...query, page },
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
    router.query = query
    router.push(router)

    if ((query.search ?? '').length < 1) {
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
    const inputElement = event.target
    const value = inputElement.value
    const name = inputElement.name
    const newQuery = {
      ...query
    }
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
                        name={'search'}
                        id={'search'}
                        type={'search'}
                        onChange={handleQueryChange}
                        onBlur={handleQueryChange}
                        value={query.search ?? ''}
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

export const getServerSideProps: GetServerSideProps = async () => {
  console.info('Loading matomo config', matomoConfig)
  return {
    props: {
      matomoConfig
    }
  }
}

export default Feeds
