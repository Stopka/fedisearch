'use client'
import { useQuery } from '@apollo/client'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { ReactElement, useEffect, useState } from 'react'
import {
  ListStatsDocument,
  SortingWayEnum, StatsAggregationFragment,
  StatsQueryInput,
  StatsSortingByEnum
} from '../../graphql/generated/types'
import { useMatomo } from '../../hooks/MatomoHook'
import createSortingInputSchema from '../../schema/createSortingInputSchema'
import createUrlSearchParams from '../../utils/createUrlSearchParams'
import ErrorMessage from '../ErrorMessage'
import Loader from '../Loader'
import ResponsiveTable from '../ResponsiveTable'
import StatsFooter from './StatsFooter'
import StatsHeader from './StatsHeader'
import StatsPlaceholder from './StatsPlaceholder'
import StatsResults from './StatsResults'

const statsQueryInputSchema = createSortingInputSchema(StatsSortingByEnum)

export default function Stats (): ReactElement {
  const [lastRowCount, setLastRowCount] = useState<number>(1)
  const [lastSum, setLastSum] = useState<StatsAggregationFragment>({
    nodeCount: 0,
    accountFeedCount: 0,
    channelFeedCount: 0
  })
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const matomo = useMatomo()
  let routerQuery: StatsQueryInput
  try {
    routerQuery = statsQueryInputSchema.parse(Object.fromEntries(searchParams))
  } catch (e) {
    console.warn(e)
    routerQuery = {
      sortBy: StatsSortingByEnum.NodeCount,
      sortWay: SortingWayEnum.Desc
    }
  }
  const [query, setQuery] = useState<StatsQueryInput>(routerQuery)
  const { loading, error, data } = useQuery(ListStatsDocument, {
    variables: {
      query
    }
  })
  useEffect(() => {
    const items = data?.listStats?.items
    const sum = data?.listStats?.aggregations.sum
    if (items === undefined || sum === undefined) {
      return
    }
    setLastRowCount(items.length)
    setLastSum(sum)
  }, [data])
  useEffect(() => {
    window.history.replaceState({}, '', `${pathname ?? ''}?${createUrlSearchParams(query).toString()}`)
    matomo.trackEvent({
      category: 'stats',
      action: 'new-search'
    })
  }, [query])

  const toggleSort = (sortBy: StatsSortingByEnum): void => {
    const sortWay = query.sortBy === sortBy && query.sortWay === SortingWayEnum.Asc ? SortingWayEnum.Desc : SortingWayEnum.Asc
    matomo.trackEvent({
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

  return (<>
            <ResponsiveTable className={'stats'}>
                <StatsHeader query={query} onSortToggle={toggleSort}/>
                <Loader loading={loading} showTop={true} hideContent={true}
                        placeholder={(<StatsPlaceholder rowCount={lastRowCount}/>)}>
                    <StatsResults items={data?.listStats?.items} maxAggregation={data?.listStats?.aggregations.max}/>
                </Loader>
                <StatsFooter sumAggregation={lastSum}/>
            </ResponsiveTable>
            <ErrorMessage message={error?.message}/>
        </>
  )
}
