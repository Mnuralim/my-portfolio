'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  nav: {
    name: string
    href: string
    icon: React.JSX.Element
  }
}

const SidebarItem = ({ nav }: Props) => {
  const pathName = usePathname()
  return (
    <Link
      href={nav.href}
      className={`w-full h-12 gap-3 flex px-4 items-center ${pathName.startsWith(nav.href) ? 'bg-indigo-800' : ''}`}
      key={nav.name}
    >
      <span>{nav.icon}</span>
      <span className="font-bold">{nav.name}</span>
    </Link>
  )
}

export default SidebarItem
