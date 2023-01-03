import React, { MouseEventHandler, ReactElement, ReactNode } from 'react'
import { SortingWayEnum } from '../graphql/generated/types'
import { Sort } from '../types/Sort'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SortToggle ({ onToggle, field, sort, children }: {
  onToggle: (StatsRequestSortBy) => void
  field: string
  sort: Sort
  children: ReactNode
}): ReactElement {
  const handleToggle: MouseEventHandler = (event) => {
    event.preventDefault()
    onToggle(field)
  }
  return (
    <a className={'sort-toggle'} href={''} onClick={handleToggle}>
      <span>{children}</span>
      {sort.sortBy === field && sort.sortWay === SortingWayEnum.Asc
        ? (
              <FontAwesomeIcon icon={faSortUp} className={'margin-left'} />
          )
        : ''
      }
      {sort.sortBy === field && sort.sortWay === SortingWayEnum.Desc
        ? (
              <FontAwesomeIcon icon={faSortDown} className={'margin-left'} />
          )
        : ''
      }
    </a>
  )
}
