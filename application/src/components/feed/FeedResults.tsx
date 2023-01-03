import React, { ReactElement } from 'react'
import { ListFeedsItemFragment } from '../../graphql/generated/types'
import FeedResult from './FeedResult'

export default function FeedResults ({ feeds }: { feeds: ListFeedsItemFragment[] | undefined }): ReactElement {
  if (feeds === undefined) {
    return <></>
  }
  if (feeds.length === 0) {
    return (
            <>
                <p className={'no-results'}>We have no results for your query.</p>
            </>
    )
  }
  return (<div className={'grid'}>
        {
            feeds.map((feed, index) => {
              console.info('feed', feed)
              return (<FeedResult key={index} feed={feed} />)
            })
        }
    </div>)
}
