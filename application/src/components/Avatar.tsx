import React from 'react'

const Avatar:React.FC<{url:string|null|undefined}> = ({ url }) => {
  const fallbackImage = '/avatar.svg'

  const handleAvatarImageError = (event) => {
    event.target.src = fallbackImage
  }

  return (
      <img
          className={'avatar'}
          src={url ?? fallbackImage}
          alt={'Avatar'}
          onError={handleAvatarImageError}
      />
  )
}
export default Avatar
