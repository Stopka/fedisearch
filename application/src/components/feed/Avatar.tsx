'use client'
import React, { ReactElement } from 'react'
import FallbackImage from '../FallbackImage'

export default function Avatar ({ url }: { url?: string | null | undefined }): ReactElement {
  return (
        <FallbackImage
            className={'avatar'}
            src={url ?? '/avatar.svg'}
            fallbackSrc={'/avatar.svg'}
            alt={'Avatar'}
        />
  )
}
