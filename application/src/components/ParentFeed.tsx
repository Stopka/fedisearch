import React from 'react'
import Avatar from './Avatar'
import { ParentFeedItem } from '../graphql/client/queries/ListFeedsQuery'

const ParentFeed: React.FC<{feed:ParentFeedItem|null}> = ({ feed }) => {
  if (!feed) {
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
