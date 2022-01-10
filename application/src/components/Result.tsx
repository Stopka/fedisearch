import React, { useEffect } from 'react'
import striptags from 'striptags'
import Avatar from './Avatar'
import SoftwareBadge from './badges/SoftwareBadge'
import FeedTypeBadge from './badges/FeedTypeBadge'
import SubscriptionsBadge from './badges/SubscriptionsBadge'
import CreatedAtBadge from './badges/CreatedAtBadge'
import LastPostAtBadge from './badges/LastPostAtBadge'
import BotBadge from './badges/BotBadge'
import { FeedResponseField, FeedResponseItem } from '../types/FeedResponse'
import ParentFeed from './ParentFeed'
import StatusesCountBadge from './badges/StatusesCountBadge'

const Result:React.FC<{ feed:FeedResponseItem }> = ({ feed }) => {
  const fallbackEmojiImage = '/emoji.svg'

  const handleEmojiImageError = (event) => {
    event.target.src = fallbackEmojiImage
  }

  useEffect(() => {
    document.querySelectorAll('.with-emoji img').forEach(element => {
      if (element.attributes['data-error-handler']) {
        return
      }
      element.addEventListener('error', handleEmojiImageError)
      element.setAttribute('data-error-handler', 'attached')
    })
  })

  return (
      <section className={'feed'}>
          <h3 className={'display-name with-emoji'}>
              <a href={feed.url}
                 dangerouslySetInnerHTML={{ __html: striptags(feed.displayName !== '' ? feed.displayName : feed.name, ['img']) }}
              />
          </h3>
        <Avatar url={feed.avatar}/>
        <div className={'address'}>
            <span>{feed.name}@{feed.node.domain}</span>
            <ParentFeed feed={feed.parentFeed}/>
        </div>
      <div className={'badges'}>
          <SoftwareBadge softwareName={feed.node.softwareName}/>
          <FeedTypeBadge type={feed.type}/>
          <SubscriptionsBadge followingCount={feed.followingCount} followersCount={feed.followersCount}/>
          <StatusesCountBadge statusesCount={feed.statusesCount}/>
          <CreatedAtBadge createdAt={feed.createdAt}/>
          <LastPostAtBadge lastStatusAt={feed.lastStatusAt}/>
          <BotBadge bot={feed.bot}/>
      </div>
        {feed.fields.length > 0
          ? (
            <table className={'fields'}>
                {
                    feed.fields.map((field:FeedResponseField, index:number):React.ReactNode => {
                      return (
                            <tr key={index}>
                                <th className={'with-emoji'}
                                    dangerouslySetInnerHTML={{ __html: striptags(field.name, ['a', 'strong', 'em', 'img']) }}/>
                                <td className={'with-emoji'}
                                    dangerouslySetInnerHTML={{ __html: striptags(field.value, ['a', 'strong', 'em', 'img']) }}/>
                            </tr>
                      )
                    })
                }
            </table>
            )
          : ''}
        <div className={'description with-emoji'}
             dangerouslySetInnerHTML={{ __html: striptags(feed.description, ['img', 'p', 'strong', 'em', 'br', 'a']) }}/>
    </section>)
}

export default Result
