import React, { ReactElement } from 'react'
import FormattedDate from '../../FormattedDate'
import Badge from './Badge'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

export default function LastPostAtBadge ({ lastStatusAt }: { lastStatusAt: string | null }): ReactElement {
  return (
      <Badge faIcon={faCalendarCheck}
             label={'Last status at'}
             value={lastStatusAt !== null ? <FormattedDate timestamp={lastStatusAt}/> : null}
             className={'last-status-at'}
      />
  )
}
