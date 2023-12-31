import { getUserData } from '@/lib/user'
import React from 'react'
import { IUser } from '../../../../types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CgProfile } from 'react-icons/cg'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'
import SidebarItem from './SidebarItem'
import LogoutButton from './LogoutButton'

const Sidebar = async () => {
  const getUser = await getUserData()
  const user: IUser = getUser.data
  const navs = [
    {
      name: 'Profile',
      href: '/admin/profile',
      icon: <CgProfile size="20" />,
    },
    {
      name: 'Portfolio',
      href: '/admin/portfolio',
      icon: <HiOutlineBookOpen size="20" />,
    },
    {
      name: 'Skill',
      href: '/admin/skill',
      icon: <AiOutlineThunderbolt size="20" />,
    },
  ]
  return (
    <aside className="h-screen w-1/5 bg-soft-color fixed left-0">
      <Avatar className="w-32 h-32 mx-auto mt-5">
        <AvatarImage src={user.imageProfile} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className="text-center font-semibold my-3">{user.name}</h1>
      <div className="w-full mt-10">
        {navs.map((nav) => (
          <SidebarItem nav={nav} key={nav.name} />
        ))}
      </div>
      <div className="absolute bottom-7 left-0 px-4">
        <LogoutButton />
      </div>
    </aside>
  )
}

export default Sidebar
