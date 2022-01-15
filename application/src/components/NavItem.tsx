import React, { FC, ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavItem:FC<{path:string, label:string, icon:ReactElement}> = ({ path, label, icon }) => {
  const router = useRouter()
  return (
        <li>
            <Link href={path}>
                <a className={router.pathname === path ? 'active' : ''}>
                    {icon}
                    <span>{label}</span>
                </a>
            </Link>
        </li>
  )
}
export default NavItem
