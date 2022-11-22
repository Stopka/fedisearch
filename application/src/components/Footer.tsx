import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className={'text-center mt-5'}>
        <p><a href={'/optout'}>How to opt-out</a></p>
      <p>©{(new Date()).getFullYear()} <a href={'https://skorpil.cz'}>Štěpán Škorpil</a></p>
    </footer>
  )
}

export default Footer
