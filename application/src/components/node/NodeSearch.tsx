'use client'
import { useQuery } from '@apollo/client'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { ReactElement, useEffect, useState } from 'react'
import { z } from 'zod'
import {
  FeedQueryInput,
  ListNodesDocument,
  NodeQueryInput,
  NodeSortingByEnum,
  SortingWayEnum
} from '../../graphql/generated/types'
import { useMatomo } from '../../hooks/MatomoHook'
import createUrlSearchParams from '../../utils/createUrlSearchParams'
import { stringTrimmed, transform } from '../../utils/transform'
import createSortingInputSchema from '../../schema/createSortingInputSchema'
import ErrorMessage from '../ErrorMessage'
import Loader from '../Loader'
import LoadMoreButton from '../LoadMoreButton'
import ResponsiveTable from '../ResponsiveTable'
import NodeForm from './NodeForm'
import NodeHeader from './NodeHeader'
import NodePlaceholder from './NodePlaceholder'
import NodeResults from './NodeResults'

export const nodeQueryInputSchema = createSortingInputSchema(NodeSortingByEnum)
  .extend(
    {
      search: transform(
        z.string().optional(),
        stringTrimmed,
        z.string()
      )
    }
  )

export default function NodeSearch (): ReactElement {
  const matomo = useMatomo()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [lastRowCount, setLastRowCount] = useState<number>(1)
  let routerQuery: NodeQueryInput
  try {
    routerQuery = nodeQueryInputSchema.parse(Object.fromEntries(searchParams))
  } catch (e) {
    routerQuery = {
      search: '',
      sortBy: NodeSortingByEnum.RefreshedAt,
      sortWay: SortingWayEnum.Desc
    }
  }
  const [query, setQuery] = useState<NodeQueryInput>(routerQuery)
  const [page, setPage] = useState<number>(0)
  const [pageLoading, setPageLoading] = useState<undefined | 'sort' | 'submit' | 'more'>(undefined)

  const { loading, error, data, fetchMore, refetch } = useQuery(ListNodesDocument, {
    variables: {
      query,
      paging: {
        page: 0
      }
    }
  })

  useEffect(() => {
    const items = data?.listNodes?.items
    if (items === undefined) {
      return
    }
    setLastRowCount(items.length)
  }, [data])

  useEffect(() => {
    matomo.trackEvent({
      category: 'nodes',
      action: 'next-page',
      customDimensions: [
        {
          value: page.toString(),
          id: 1
        }
      ]
    })
  }, [page])
  useEffect((): void => {
    window.history.replaceState({}, '', `${pathname ?? ''}?${createUrlSearchParams(query).toString()}`)
    matomo.trackEvent({
      category: 'nodes',
      action: 'new-search'
    })
  }, [query])

  const handleQueryChange = (query: FeedQueryInput): void => {
    console.info('Query changed', { query })
    setQuery(query)
    setPage(0)
  }

  const handleSearchSubmit = async (): Promise<void> => {
    setPageLoading('submit')
    setQuery(query)
    setPage(0)
    await refetch({ paging: { page: 0 } })
    setPageLoading(undefined)
  }

  const handleLoadMore = async (): Promise<void> => {
    setPage(page + 1)
    console.info('Loading next page', { query, page })
    setPageLoading('more')
    await fetchMore({
      variables: {
        paging: { page: page + 1 }
      },
      updateQuery: (previousData, { fetchMoreResult }) => {
        console.log('more', {
          previousData, fetchMoreResult
        })
        if (undefined === fetchMoreResult?.listNodes?.items) {
          return previousData
        }
        if (undefined === previousData?.listNodes?.items) {
          return fetchMoreResult
        }
        fetchMoreResult.listNodes.items = [
          ...previousData.listNodes.items,
          ...fetchMoreResult.listNodes.items
        ]
        return fetchMoreResult
      }
    })
    setPageLoading(undefined)
  }

  const toggleSort = (sortBy: NodeSortingByEnum): void => {
    const sortWay = query.sortBy === sortBy && query.sortWay === SortingWayEnum.Asc ? SortingWayEnum.Desc : SortingWayEnum.Asc
    matomo.trackEvent({
      category: 'nodes',
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

  return (
        <>
            <NodeForm query={query} onQueryChange={handleQueryChange} onSubmit={handleSearchSubmit} loading={loading || pageLoading !== undefined}/>
            <ResponsiveTable>
                <NodeHeader onSortToggle={toggleSort} query={query}/>
                <Loader
                    loading={loading || pageLoading !== undefined}
                    showBottom={true}
                    placeholder={(<NodePlaceholder rowCount={pageLoading === 'more' ? 1 : lastRowCount}/>)}>
                    <NodeResults nodes={data?.listNodes?.items}/>
                </Loader>
            </ResponsiveTable>
            <LoadMoreButton onClick={handleLoadMore}
                            show={!loading && pageLoading === undefined && data?.listNodes?.paging?.hasNext === true}/>
            <ErrorMessage message={error?.message}/>
        </>
  )
}
