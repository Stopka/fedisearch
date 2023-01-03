import React, { ReactElement } from 'react'
import { faRss, faUser } from '@fortawesome/free-solid-svg-icons'
import Badge from './Badge'

export default function FeedTypeBadge ({ type }: { type: 'account' | 'channel' }): ReactElement {
  return (
        <Badge faIcon={type === 'channel' ? faRss : faUser}
               label={'Feed type'}
               value={type === 'channel' ? 'Channel' : 'Account'}
               className={'feed-type'}
        />
  )
}
