import React, { useState } from 'react'
import NavItem from './NavItem'
import { faUser, faServer, faChartPie } from '@fortawesome/free-solid-svg-icons'

const NavBar:React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark  mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href={'/'}>
                    <img
                        src="/fedisearch.svg"
                        alt={'FediSearch logo'}
                        className="d-inline-block align-text-top logo"
                    />
                    <span>FediSearch</span>
                </a>
                <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShowMenu(!showMenu)}>
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={'collapse navbar-collapse' + (showMenu ? ' show' : '')}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavItem path={'/feeds'} label={'People'} icon={faUser} />
                        <NavItem path={'/nodes'} label={'Servers'} icon={faServer} />
                        <NavItem path={'/stats'} label={'Stats'} icon={faChartPie} />
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default NavBar
