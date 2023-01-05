'use client'
import React, { ReactElement } from 'react'
import { StatsQueryInput, StatsSortingByEnum } from '../../graphql/generated/types'
import SortToggle from '../SortToggle'

export default function StatsHeader ({ query, onSortToggle }: {
  query: StatsQueryInput
  onSortToggle: (sortBy: StatsSortingByEnum) => void
}): ReactElement {
  return <thead>
    <tr>
        <th>
            <SortToggle onToggle={onSortToggle} field={'softwareName'} sort={query}>
                Software name
            </SortToggle>
        </th>
        <th className={'text-end'}>
            <SortToggle onToggle={onSortToggle} field={'nodeCount'} sort={query}>
                Instance count
            </SortToggle>
        </th>
        <th className={'text-end'}>
            <SortToggle onToggle={onSortToggle} field={'accountFeedCount'} sort={query}>
                Account count
            </SortToggle>
        </th>
        <th className={'text-end'}>
            <SortToggle onToggle={onSortToggle} field={'channelFeedCount'} sort={query}>
                Channel count
            </SortToggle>
        </th>
    </tr>
    </thead>
}
