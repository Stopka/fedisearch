import React from 'react'

const Footer:React.FC = () => {
  return (
    <footer>
      ©{(new Date()).getFullYear()} <a href={'https://skorpil.cz'}>skorpil.cz</a>
    </footer>
  )
}

export default Footer
