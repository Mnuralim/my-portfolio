import React from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { slideIn } from '@/utils/motion'
import { HiOutlineHome } from 'react-icons/hi'
import { MdOutlinePerson4 } from 'react-icons/md'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { LuPhone } from 'react-icons/lu'

const BottomBar = () => {
  const navs = [
    {
      name: 'home',
      icon: <HiOutlineHome />,
    },
    {
      name: 'about',
      icon: <MdOutlinePerson4 />,
    },
    {
      name: 'skill',
      icon: <AiOutlineThunderbolt />,
    },
    {
      name: 'portfolio',
      icon: <HiOutlineBookOpen />,
    },
    {
      name: 'contact',
      icon: <LuPhone />,
    },
  ]
  return (
    <motion.nav
      variants={slideIn('up', 'tween', 0.1, 0.3)}
      initial="hidden"
      whileInView="show"
      className="fixed md:hidden inset-x-0 bottom-6 z-[100] mx-auto flex h-16 w-4/5 items-center justify-evenly rounded-2xl bg-white/40 text-lg backdrop-blur-md dark:bg-slate-900/50 "
    >
      {navs.map((nav) => (
        <Link
          key={nav.name}
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          to={nav.name}
          className="cursor-pointer text-black/75 hover:text-indigo-500 dark:text-slate-50"
        >
          {nav.icon}
        </Link>
      ))}
    </motion.nav>
  )
}

export default BottomBar
