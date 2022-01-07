import React from 'react'
import Avatar from './Avatar'
import { FeedResponseParent } from '../types/FeedResponse'

const ParentFeed: React.FC<{feed:FeedResponseParent|null}> = ({ feed }) => {
  if (feed === null) {
    return (<></>)
  }
  return (
        <div className={'parent-feed'}>
            <Avatar url={feed.avatar}/>
            <div className={'display-name'}>
                <a href={feed.url}>{feed.displayName}</a>
            </div>
            <div className={'address'}>{feed.name}@{feed.domain}</div>
        </div>
  )
}

export default ParentFeed
