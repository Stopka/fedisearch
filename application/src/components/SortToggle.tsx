import React from 'react'
import { StatsRequest, StatsRequestSortBy } from '../types/StatsRequest'

const SortToggle: React.FC<{
  onToggle:(StatsRequestSortBy)=>void,
  field:StatsRequestSortBy,
  sort: StatsRequest
}> = ({ onToggle, field, sort, children }) => {
  return (
    <a className={'sort-toggle'} href={'#'} onClick={() => onToggle(field)}>
      <span>{children}</span>
      {sort.sortBy === field && sort.sortWay === 'asc'
        ? (
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-up"
                   className="sort-icon svg-inline--fa fa-sort-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 320 512">
                <path fill="currentColor"
                      d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"/>
              </svg>
          )
        : ''
      }
      {sort.sortBy === field && sort.sortWay === 'desc'
        ? (
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down"
                   className="sort-icon svg-inline--fa fa-sort-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 320 512">
                <path fill="currentColor"
                      d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/>
              </svg>
          )
        : ''
      }
    </a>
  )
}

export default SortToggle
