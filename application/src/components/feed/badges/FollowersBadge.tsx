import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import React, { ReactElement } from 'react'
import Badge from './Badge'

export default function FollowersBadge ({ followers }: { followers: number | null | undefined }): ReactElement {
  return (
      <Badge faIcon={faUserFriends}
             label={'Followers'}
             value={followers}
             className={'followers'}
      />
  )
}
