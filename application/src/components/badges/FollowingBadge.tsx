import { faEye } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Badge from './Badge'

const FollowingBadge: React.FC<{ following: number | null }> = ({ following }) => {
  return (
      <Badge faIcon={faEye}
             label={'Following'}
             value={following}
             className={'following'}
      />
  )
}
export default FollowingBadge
