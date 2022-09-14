import React, { useEffect } from 'react'
import striptags from 'striptags'
import Avatar from './Avatar'
import SoftwareBadge from './badges/SoftwareBadge'
import FeedTypeBadge from './badges/FeedTypeBadge'
import CreatedAtBadge from './badges/CreatedAtBadge'
import LastPostAtBadge from './badges/LastPostAtBadge'
import BotBadge from './badges/BotBadge'
import ParentFeed from './ParentFeed'
import StatusesCountBadge from './badges/StatusesCountBadge'
import FollowersBadge from './badges/FollowersBadge'
import FollowingBadge from './badges/FollowingBadge'
import { FeedResultItem } from '../graphql/client/queries/ListFeedsQuery'

const FeedResult = ({
  feed
}:{ feed: FeedResultItem }) => {
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
        <section className="card feed g-col-12 mb-3">
            <div className="card-body">
                <h3 className={'card-title with-emoji display-name'}>
                    <a href={feed.url}
                       dangerouslySetInnerHTML={{ __html: striptags(feed.displayName !== '' ? feed.displayName : feed.name, ['img']) }}
                    />
                </h3>
                <Avatar url={feed.avatar}/>
                <div className={'address'}>
                    <span>{feed.id}</span>
                    <ParentFeed feed={feed.parent}/>
                </div>
                <SoftwareBadge softwareName={feed.node.softwareName}/>
                <div className={'badges'}>
                    <FeedTypeBadge type={feed.type}/>
                    <FollowersBadge followers={feed.followersCount}/>
                    <FollowingBadge following={feed.followingCount}/>
                    <StatusesCountBadge statusesCount={feed.statusesCount}/>
                    <CreatedAtBadge createdAt={feed.createdAt}/>
                    <LastPostAtBadge lastStatusAt={feed.lastStatusAt}/>
                    <BotBadge bot={feed.bot}/>
                </div>
                {feed.fields.length > 0
                  ? (
                        <div className={'table-responsive fields'}>
                            <table className={'table'}>
                                <tbody>
                                {
                                    feed.fields.map((field, index: number): React.ReactNode => {
                                      return (
                                            <tr key={index}>
                                                <th className={'with-emoji table-active'}
                                                    dangerouslySetInnerHTML={{ __html: striptags(field.name, ['a', 'strong', 'em', 'img']) }}/>
                                                <td className={'with-emoji'}
                                                    dangerouslySetInnerHTML={{ __html: striptags(field.value, ['a', 'strong', 'em', 'img']) }}/>
                                            </tr>
                                      )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    )
                  : ''}
                <div className={'description with-emoji'}
                     dangerouslySetInnerHTML={{ __html: striptags(feed.description, ['img', 'p', 'strong', 'em', 'br', 'a']) }}/>
            </div>
        </section>)
}

export default FeedResult
