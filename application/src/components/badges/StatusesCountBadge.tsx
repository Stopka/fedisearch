import React from 'react'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import Badge from './Badge'

const StatusesCountBadge: React.FC<{ statusesCount: number | null }> = ({ statusesCount }) => {
  return (
      <Badge faIcon={faCommentAlt}
             label={'Status count'}
             value={statusesCount}
             className={'last-status-at'}
      />
  )
}

export default StatusesCountBadge
