import React from 'react'
import FallbackImage from './FallbackImage'

const Avatar: React.FC<{ url: string | null | undefined }> = ({ url }) => {
  return (
        <FallbackImage
            className={'avatar'}
            src={url ?? undefined}
            fallbackSrc={'/avatar.svg'}
            alt={'Avatar'}
        />
  )
}
export default Avatar
