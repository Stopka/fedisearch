import React from 'react'
import Result from './Result'
import { FeedResponseItem } from '../types/FeedResponse'

const Results:React.FC<{feeds:FeedResponseItem[]}> = ({ feeds }) => {
  if (feeds.length === 0) {
    return (
        <>
            <h2>Nothing found</h2>
            <p className={'no-results'}>We have no results for your query.</p>
        </>
    )
  }
  return (<>
      <h2>Results</h2>
        {
            feeds.map((feed, index) => {
              console.info('feed', feed)
              return (<Result key={index} feed={feed}/>)
            })
        }
    </>)
}

export default Results
