import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavItem:FC<{path:string, label:string, icon:IconProp}> = ({ path, label, icon }) => {
  const router = useRouter()
  const active = router.pathname === path
  return (
        <li className={'nav-item'}>
            <Link href={path}>
                <a className={'nav-link' + (active ? ' active' : '')} aria-current={active ? 'page' : undefined}>
                    <FontAwesomeIcon icon={icon} className={'margin-right'} />
                    <span>{label}</span>
                </a>
            </Link>
        </li>
  )
}
export default NavItem
