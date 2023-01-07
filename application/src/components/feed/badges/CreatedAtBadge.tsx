import React, { ReactElement } from 'react'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import FormattedDate from '../../FormattedDate'
import Badge from './Badge'

export default function CreatedAtBadge ({ createdAt }: { createdAt: string | null }): ReactElement {
  return (
      <Badge faIcon={faCalendarPlus}
             label={'Created at'}
             value={createdAt !== null ? <FormattedDate timestamp={createdAt}/> : null}
             className={'created-at'}
      />
  )
}
