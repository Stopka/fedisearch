import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Badge from './Badge'

const FollowersBadge: React.FC<{ followers: number | null }> = ({ followers }) => {
  return (
      <Badge faIcon={faUserFriends}
             label={'Followers'}
             value={followers}
             className={'followers'}
      />
  )
}
export default FollowersBadge
