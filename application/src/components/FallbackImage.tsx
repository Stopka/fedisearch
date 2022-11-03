import React, { ImgHTMLAttributes, ReactElement, useEffect, useState } from 'react'

export default function FallbackImage ({
  fallbackSrc,
  src,
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string }): ReactElement {
  const [showFallback, setShowFallback] = useState<boolean>(false)
  useEffect(() => {
    setShowFallback(src === undefined || src === null || src === '')
  }, [src])
  const handleError = (event): void => {
    if (props.onError != null) {
      props.onError(event)
    }
    if (fallbackSrc === undefined || fallbackSrc === '') {
      return
    }
    setShowFallback(true)
  }
  if (showFallback) {
    return <img src={fallbackSrc} alt={alt} onError={handleError} {...props}/>
  }
  return <img src={src} alt={alt} onError={handleError} {...props}/>
}
