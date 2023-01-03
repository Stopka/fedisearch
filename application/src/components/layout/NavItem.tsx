import { usePathname } from 'next/navigation'
import React, { FC } from 'react'
import Link from 'next/link'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavItem: FC<{ path: string, label: string, icon: IconProp }> = ({ path, label, icon }) => {
  const currentPath = usePathname()
  const active = currentPath === path
  return (
        <li className={'nav-item'}>
            <Link
                href={path}
                className={'nav-link' + (active ? ' active' : '')}
                aria-current={active ? 'page' : undefined}
            >
                    <FontAwesomeIcon icon={icon} className={'margin-right'} />
                    <span>{label}</span>
            </Link>
        </li>
  )
}
export default NavItem
