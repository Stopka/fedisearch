import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import FeedResults from '../components/FeedResults'
import Layout, { siteTitle } from '../components/Layout'
import { matomoConfig } from '../lib/matomoConfig'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleDoubleDown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import {
  ListFeedsQuery, ListFeedsResult
} from '../graphql/client/queries/ListFeedsQuery'
import getMatomo from '../lib/getMatomo'
import { feedQueryInputSchema, FeedQueryInputType } from '../graphql/common/types/FeedQueryInput'
import { ListFeedsVariables } from '../graphql/common/queries/listFeeds'

const Feeds: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ matomoConfig }) => {
  const router = useRouter()
  const routerQuery = feedQueryInputSchema.parse(router.query)
  const [page, setPage] = useState<number>(0)
  const [query, setQuery] = useState<FeedQueryInputType>(routerQuery)
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const { loading, data, error, fetchMore, refetch } = useQuery<ListFeedsResult, ListFeedsVariables>(ListFeedsQuery, {
    variables: {
      paging: { page: 0 },
      query
    }
  })
  useEffect(() => {
    router.push({ query })
    getMatomo(matomoConfig).trackEvent({
      category: 'feeds',
      action: 'new-search'
    })
  }, [query])
  useEffect(() => {
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
  }, [page])

  const handleQueryChange = (event) => {
    const inputElement = event.target
    const value = inputElement.value
    const name = inputElement.name
    const newQuery = {
      ...query
    }
    newQuery[name] = value
    setQuery(newQuery)
    setPage(0)
  }

  const handleSearchSubmit = async (event) => {
    event.preventDefault()
    setPageLoading(true)
    setPage(0)
    await refetch({ paging: { page: 0 } })
    setPageLoading(false)
  }

  const handleLoadMore = async (event) => {
    event.preventDefault()
    setPageLoading(true)
    await fetchMore({
      variables: {
        paging: { page: page + 1 }
      },
      updateQuery: (previousData, { fetchMoreResult }) => {
        fetchMoreResult.listFeeds.items = [
          ...previousData.listFeeds.items,
          ...fetchMoreResult.listFeeds.items
        ]
        return fetchMoreResult
      }
    })
    setPageLoading(false)
    setPage(page + 1)
  }

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

            <Loader loading={loading || pageLoading} showBottom={true}>
                {
                  data && query.search
                    ? <FeedResults feeds={data.listFeeds.items} />
                    : ''
                }
            </Loader>
            {!loading && !pageLoading && data?.listFeeds?.paging?.hasNext
              ? (
                    <div className={'d-flex justify-content-center'}>
                        <button className={'btn btn-secondary'} onClick={handleLoadMore}>
                            <FontAwesomeIcon icon={faAngleDoubleDown} className={'margin-right'}/>
                            <span>Load more</span>
                        </button>
                    </div>
                )
              : ''}
            {error
              ? (<div className={'d-flex justify-content-center'}>
                      <FontAwesomeIcon icon={faExclamationTriangle} className={'margin-right'}/>
                      <span>{error.message}</span>
                </div>)
              : ''}
        </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      matomoConfig
    }
  }
}

export default Feeds
