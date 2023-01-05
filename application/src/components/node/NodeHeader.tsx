import React, { ReactElement } from 'react'
import { NodeQueryInput, NodeSortingByEnum } from '../../graphql/generated/types'
import SortToggle from '../SortToggle'

export default function NodeHeader ({ query, onSortToggle }: {
  query: NodeQueryInput
  onSortToggle: (sortBy: NodeSortingByEnum) => void
}): ReactElement {
  return (
        <thead>
        <tr>
            <th rowSpan={2}>
                <SortToggle onToggle={onSortToggle} field={'domain'} sort={query}>
                    Domain
                </SortToggle>
            </th>
            <th rowSpan={2}>
                <SortToggle onToggle={onSortToggle} field={'softwareName'} sort={query}>
                    Software
                </SortToggle>
            </th>
            <th colSpan={4}>User count</th>
            <th rowSpan={2} className={'number-cell'}>
                <SortToggle onToggle={onSortToggle} field={'statusesCount'} sort={query}>
                    Statuses
                </SortToggle>
            </th>
            <th rowSpan={2}>
                <SortToggle onToggle={onSortToggle} field={'openRegistrations'} sort={query}>
                    Registrations
                </SortToggle>
            </th>
            <th rowSpan={2}>
                <SortToggle onToggle={onSortToggle} field={'refreshedAt'} sort={query}>
                    Last refreshed
                </SortToggle>
            </th>
        </tr>
        <tr>
            <th className={'text-end'}>
                <SortToggle onToggle={onSortToggle} field={'totalUserCount'} sort={query}>
                    Total
                </SortToggle>
            </th>
            <th className={'text-end'}>
                <SortToggle onToggle={onSortToggle} field={'accountFeedCount'} sort={query}>
                    Indexed
                </SortToggle>
            </th>
            <th className={'text-end'}>
                <SortToggle onToggle={onSortToggle} field={'monthActiveUserCount'} sort={query}>
                    Month active
                </SortToggle>
            </th>
            <th className={'text-end'}>
                <SortToggle onToggle={onSortToggle} field={'halfYearActiveUserCount'} sort={query}>
                    Half year active
                </SortToggle>
            </th>
        </tr>
        </thead>
  )
}
