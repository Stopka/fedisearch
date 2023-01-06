'use client'
import { useQuery } from '@apollo/client'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { ReactElement, useEffect, useState } from 'react'
import { z } from 'zod'
import { FeedQueryInput, ListFeedsDocument } from '../../graphql/generated/types'
import { useMatomo } from '../../hooks/MatomoHook'
import createUrlSearchParams from '../../utils/createUrlSearchParams'
import { stringTrimmed, transform } from '../../utils/transform'
import FeedInfo from './FeedInfo'
import FeedResults from './FeedResults'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'
import LoadMoreButton from '../LoadMoreButton'
import FeedForm from './FeedForm'
import FeedPlaceholder from './FeedPlaceholder'

export const feedQueryInputSchema = z.object({
  search: transform(
    z.string().optional(),
    stringTrimmed,
    z.string()
  )
})

export default function FeedSearch (): ReactElement {
  const matomo = useMatomo()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const routerQuery = feedQueryInputSchema.parse(Object.fromEntries(searchParams))
  const [page, setPage] = useState<number>(0)
  const [query, setQuery] = useState<FeedQueryInput>(routerQuery)
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const { loading, data, error, fetchMore, refetch } = useQuery(ListFeedsDocument, {
    variables: {
      paging: { page: 0 },
      query
    }
  })
  useEffect((): void => {
    window.history.replaceState({}, '', `${pathname ?? ''}?${createUrlSearchParams(query).toString()}`)
    matomo.trackEvent({
      category: 'feeds',
      action: 'new-search'
    })
  }, [query])
  useEffect(() => {
    matomo.trackEvent({
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

  const handleQueryChange = (query: FeedQueryInput): void => {
    setQuery(query)
    setPage(0)
  }

  const handleSearchSubmit = async (): Promise<void> => {
    setPageLoading(true)
    setPage(0)
    await refetch({ paging: { page: 0 } })
    setPageLoading(false)
  }

  const handleLoadMore = async (): Promise<void> => {
    setPageLoading(true)
    await fetchMore({
      variables: {
        paging: { page: page + 1 }
      },
      updateQuery: (previousData, { fetchMoreResult }) => {
        if (undefined === fetchMoreResult?.listFeeds?.items) {
          return previousData
        }
        if (undefined === previousData?.listFeeds?.items) {
          return fetchMoreResult
        }
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

  return <>
        <FeedForm query={query} onQueryChange={handleQueryChange} onSubmit={handleSearchSubmit} loading={loading || pageLoading}/>
        <FeedInfo show={query.search === ''}>
            <Loader loading={loading || pageLoading} showBottom={true} placeholder={(<FeedPlaceholder/>)}>
                <FeedResults feeds={data?.listFeeds?.items}/>
            </Loader>
            <LoadMoreButton
                show={!loading && !pageLoading && data?.listFeeds?.paging?.hasNext === true}
                onClick={handleLoadMore}
            />
            <ErrorMessage message={error?.message}/>
        </FeedInfo>
    </>
}
