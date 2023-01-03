import React, { ReactElement } from 'react'
import { Maybe, ParentFeedFragment } from '../../graphql/generated/types'
import Avatar from './Avatar'

export default function ParentFeed ({ feed }: { feed: Maybe<ParentFeedFragment> | undefined }): ReactElement {
  if (feed === null || feed === undefined) {
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
