import React, { ReactElement } from 'react'
import Badge from './Badge'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

export default function LastPostAtBadge ({ lastStatusAt }: { lastStatusAt: string | null }): ReactElement {
  return (
      <Badge faIcon={faCalendarCheck}
             label={'Last status at'}
             value={lastStatusAt !== null ? (new Date(lastStatusAt)).toLocaleDateString() : null}
             className={'last-status-at'}
      />
  )
}
