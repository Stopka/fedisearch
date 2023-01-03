import { faEye } from '@fortawesome/free-solid-svg-icons'
import React, { ReactElement } from 'react'
import Badge from './Badge'

export default function FollowingBadge ({ following }: { following: number | null | undefined }): ReactElement {
  return (
      <Badge faIcon={faEye}
             label={'Following'}
             value={following}
             className={'following'}
      />
  )
}
