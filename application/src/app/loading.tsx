import React, { ReactElement } from 'react'

export default function Loading (): ReactElement {
  console.log('Loading')
  return <div className={'container'}>
    <h1 className={'placeholder-glow'} aria-hidden={true}><span className={'placeholder col-4'}/></h1>
  </div>
}
