'use client'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { ReactElement } from 'react'
import { NodeQueryInput } from '../../graphql/generated/types'
import SearchInput from '../form/SearchInput'
import SubmitButton from '../form/SubmitButton'

export default function NodeForm (
  { onSubmit, onQueryChange, query, loading }: {
    onSubmit: () => void
    onQueryChange: (query: NodeQueryInput) => void
    query: NodeQueryInput
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
            <div className={'input-group mb-3'}>
                <SearchInput
                    label={'Search Fediverse servers'}
                    value={query.search}
                    onChange={handleQueryChange}
                    describedBy={'search-nodes-button'}
                />
                <SubmitButton
                    label={'Search'}
                    faIcon={faSearch}
                    id={'search-nodes-button'}
                    loading={loading}
                />
            </div>
        </form>
  )
}
