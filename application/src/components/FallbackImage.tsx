import React, { ImgHTMLAttributes, useEffect, useState } from 'react'
export default function FallbackImage ({ fallbackSrc, src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>&{fallbackSrc?:string}) {
  const [showFallback, setShowFallback] = useState<boolean>(false)
  useEffect(() => {
    setShowFallback(!src)
  }, [src])
  const handleError = (event): void => {
    if (props.onError) {
      props.onError(event)
    }
    if (!fallbackSrc) {
      return
    }
    setShowFallback(true)
  }
  if (showFallback) {
    return <img src={fallbackSrc} alt={alt} onError={handleError} {...props}/>
  }
  return <img src={src} alt={alt} onError={handleError} {...props}/>
}
