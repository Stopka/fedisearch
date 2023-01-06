import Link from 'next/link'
import React, { ReactElement } from 'react'

export default function Footer (): ReactElement {
  return (
    <footer className={'text-center mt-5'}>
        <p><Link href={'/optout'}>How to opt-out</Link></p>
      <p>©{(new Date()).getFullYear()} <a href={'https://skorpil.cz'}>Štěpán Škorpil</a></p>
    </footer>
  )
}
