import React from 'react'
import FallbackImage from '../FallbackImage'

const SoftwareBadge: React.FC<{ softwareName: string | null }> = ({ softwareName }) => {
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

export default SoftwareBadge
