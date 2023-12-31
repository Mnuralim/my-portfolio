'use client'
import React from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import { Link } from 'react-scroll'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { navVariants } from '@/utils/motion'
import { usePathname } from 'next/navigation'
import ThemeToggle from '../ThemeToggle'

const Navbar = () => {
  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className="hidden md:flex fixed top-0 z-[100]  h-14  min-w-full justify-center bg-white/50 backdrop-blur-lg sm:px-28 dark:bg-slate-800/50"
    >
      <div className="container flex items-center justify-between dark:text-slate-50">
        <div>
          <NextLink href={'/'} className="text-indigo-500 cursor-pointer">
            Muhamad Nur
          </NextLink>
        </div>
        <div className="flex gap-4 ">
          <Link
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            to="home"
            className="cursor-pointer text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-slate-50"
          >
            Home
          </Link>
          <Link
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            to="about"
            className="cursor-pointer text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-slate-50"
          >
            About
          </Link>
          <Link
            to="skill"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="cursor-pointer text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-slate-50"
          >
            Skill
          </Link>
          <Link
            to="portfolio"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            className="cursor-pointer text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-slate-50"
          >
            Portfolio
          </Link>
          <Link
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            to="contact"
            className="cursor-pointer text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-slate-50"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
