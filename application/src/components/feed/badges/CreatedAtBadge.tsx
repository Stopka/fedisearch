import React, { ReactElement } from 'react'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import Badge from './Badge'

export default function CreatedAtBadge ({ createdAt }: { createdAt: string | null }): ReactElement {
  return (
      <Badge faIcon={faCalendarPlus}
             label={'Created at'}
             value={createdAt !== null ? (new Date(createdAt)).toLocaleDateString() : null}
             className={'created-at'}
      />
  )
}
