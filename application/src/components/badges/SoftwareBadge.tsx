import React from 'react'

const SoftwareBadge:React.FC<{softwareName:string|null}> = ({ softwareName }) => {
  const fallbackImage = '/software/fediverse.svg'

  const handleSoftwareImageError = (event) => {
    event.target.src = fallbackImage
  }

  return (<div className={'badge software-name'} title={'Software name'}>
      <img className={'icon'}
           src={softwareName !== null ? `/software/${softwareName}.svg` : fallbackImage}
           alt={softwareName}
           title={softwareName}
           onError={handleSoftwareImageError}
      />
      <span className={'value'}>{softwareName}</span>
  </div>)
}

export default SoftwareBadge
