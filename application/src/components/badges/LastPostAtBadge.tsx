import React from 'react'
import Badge from './Badge'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

const LastPostAtBadge: React.FC<{ lastStatusAt: string | null }> = ({ lastStatusAt }) => {
  return (
      <Badge faIcon={faCalendarCheck}
             label={'Last status at'}
             value={lastStatusAt !== null ? (new Date(lastStatusAt)).toLocaleDateString() : null}
             className={'last-status-at'}
      />
  )
}

export default LastPostAtBadge
