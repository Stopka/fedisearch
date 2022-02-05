import React from 'react'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import Badge from './Badge'

const CreatedAtBadge:React.FC<{ createdAt: string | null }> = ({ createdAt }) => {
  return (
      <Badge faIcon={faCalendarPlus}
             label={'Created at'}
             value={createdAt !== null ? (new Date(createdAt)).toLocaleDateString() : null}
             className={'created-at'}
      />
  )
}
export default CreatedAtBadge
