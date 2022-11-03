import React from 'react'
import { Sort } from '../types/Sort'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SortToggle: React.FC<{
  onToggle: (StatsRequestSortBy) => void
  field: string
  sort: Sort
}> = ({ onToggle, field, sort, children }) => {
  return (
    <a className={'sort-toggle'} href={'#'} onClick={() => onToggle(field)}>
      <span>{children}</span>
      {sort.sortBy === field && sort.sortWay === 'asc'
        ? (
              <FontAwesomeIcon icon={faSortUp} className={'margin-left'} />
          )
        : ''
      }
      {sort.sortBy === field && sort.sortWay === 'desc'
        ? (
              <FontAwesomeIcon icon={faSortDown} className={'margin-left'} />
          )
        : ''
      }
    </a>
  )
}

export default SortToggle
