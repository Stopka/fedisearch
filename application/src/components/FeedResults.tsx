import React from 'react'
import FeedResult from './FeedResult'
import { FeedResponseItem } from '../types/FeedResponse'

const FeedResults:React.FC<{feeds:FeedResponseItem[]}> = ({ feeds }) => {
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
              return (<FeedResult key={index} feed={feed}/>)
            })
        }
    </div>)
}

export default FeedResults
