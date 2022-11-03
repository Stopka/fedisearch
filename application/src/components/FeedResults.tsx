import React, { ReactElement } from 'react'
import FeedResult from './FeedResult'
import { FeedResultItem } from '../graphql/client/queries/ListFeedsQuery'

const FeedResults = ({
  feeds
}: { feeds: FeedResultItem[] }): ReactElement => {
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

export default FeedResults
