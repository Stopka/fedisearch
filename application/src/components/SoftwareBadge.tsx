import React, { ReactElement } from 'react'
import FallbackImage from './FallbackImage'

export default function SoftwareBadge ({ softwareName }: { softwareName: string | null }): ReactElement {
  const fallbackImage = '/software/fediverse.svg'

  return (<div className={'software-name'} title={'Software name'}>
    <FallbackImage className={'icon'}
                   src={softwareName !== null ? `/software/${softwareName}.svg` : fallbackImage}
                   fallbackSrc={fallbackImage}
                   alt={softwareName ?? undefined}
                   title={softwareName ?? undefined}
    />
    <span className={'value'}>{softwareName}</span>
</div>)
}
