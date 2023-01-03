import React, { ReactElement } from 'react'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import Badge from './Badge'

export default function StatusesCountBadge ({ statusesCount }: { statusesCount: number | null | undefined }): ReactElement {
  return (
      <Badge faIcon={faCommentAlt}
             label={'Status count'}
             value={statusesCount}
             className={'last-status-at'}
      />
  )
}
