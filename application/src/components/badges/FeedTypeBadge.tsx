import React from 'react'
import { faRss, faUser } from '@fortawesome/free-solid-svg-icons'
import Badge from './Badge'

const FeedTypeBadge:React.FC<{ type: 'account' | 'channel' }> = ({ type }) => {
  return (
        <Badge faIcon={type === 'channel' ? faRss : faUser}
               label={'Feed type'}
               value={type === 'channel' ? 'Channel' : 'Account'}
               className={'feed-type'}
        />
  )
}

export default FeedTypeBadge
