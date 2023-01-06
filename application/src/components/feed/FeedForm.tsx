'use client'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { ReactElement } from 'react'
import { FeedQueryInput } from '../../graphql/generated/types'
import SearchInput from '../form/SearchInput'
import SubmitButton from '../form/SubmitButton'

export default function FeedForm (
  { onSubmit, onQueryChange, query, loading }: {
    onSubmit: () => void
    onQueryChange: (query: FeedQueryInput) => void
    query: FeedQueryInput
    loading?: boolean
  }
): ReactElement {
  const handleQueryChange = (event): void => {
    const inputElement = event.target
    const value = inputElement.value
    const name = inputElement.name
    const newQuery = {
      ...query
    }
    newQuery[name] = value
    onQueryChange(newQuery)
    event.preventDefault()
  }

  const handleSubmit = (event): void => {
    event.preventDefault()
    onSubmit()
  }

  return (
       <form onSubmit={handleSubmit}>
           <div className="input-group mb-3">
               <SearchInput
                   label={'Search people on Fediverse'}
                   onChange={handleQueryChange}
                   value={query.search ?? ''}
                   describedBy="search-feeds-button"
               />
               <SubmitButton
                   faIcon={faSearch}
                   label={'Search'}
                   loading={loading}
                   id={'search-feeds-button'}
               />
           </div>
       </form>
  )
}
