import React from 'react'
import { FeedResponseItem } from '../types/FeedResponse'

const Avatar:React.FC<{feed:FeedResponseItem}> = ({ feed }) => {
  const fallbackImage = '/avatar.svg'

  const handleAvatarImageError = (event) => {
    event.target.src = fallbackImage
  }

  return (
      <img
          className={'avatar'}
          src={feed.avatar ?? fallbackImage}
          alt={'Avatar'}
          onError={handleAvatarImageError}
      />
  )
}
export default Avatar
