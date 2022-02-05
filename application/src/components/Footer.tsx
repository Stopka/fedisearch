import React from 'react'

const Footer:React.FC = () => {
  return (
    <footer className={'text-center mt-5'}>
      ©{(new Date()).getFullYear()} <a href={'https://skorpil.cz'}>Štěpán Škorpil</a>
    </footer>
  )
}

export default Footer
