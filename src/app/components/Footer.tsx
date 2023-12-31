'use client'
import { slideIn } from '@/utils/motion'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-scroll'
import NextLink from 'next/link'
import { FaInstagram, FaGithub } from 'react-icons/fa'
import { CiLinkedin } from 'react-icons/ci'
import { IUser } from '../../../types'
import { usePathname } from 'next/navigation'

interface Props {
  user: IUser
}
export default function Footer({ user }: Props) {
  const pathName = usePathname()
  const isHidden = pathName.startsWith('/admin')

  return !isHidden ? (
    <footer className="overflow-hidden px-7 pb-36 pt-10 dark:bg-slate-800 lg:pb-14">
      <motion.section
        variants={slideIn('down', 'tween', 0.5, 1)}
        initial="hidden"
        whileInView="show"
        className="mx-auto flex flex-col justify-center gap-7 sm:flex-row sm:justify-evenly md:w-4/5"
      >
        <div className="footer__bio flex flex-col gap-2">
          <h1 className={`font-medium md:text-xl md:font-semibold`}>{user.name}</h1>
          <h6 className="text-sm text-slate-500 dark:text-slate-300 md:text-base">{user.position}</h6>
          <div className="mb-0 flex gap-3 text-sm text-slate-500 md:text-base">
            <NextLink target="_blank" className={`hover:text-indigo-500`} rel="noreferrer" href={user.instagram}>
              <FaInstagram />
            </NextLink>
            <NextLink target="_blank" className={`hover:text-indigo-500`} rel="noreferrer" href={user.linkedin}>
              <CiLinkedin />
            </NextLink>
            <NextLink target="_blank" className={`hover:text-indigo-500`} rel="noreferrer" href={user.github}>
              <FaGithub />
            </NextLink>
          </div>
        </div>
        <div className="footer__info flex flex-col gap-2">
          <h6 className="font-semibold text-slate-700 dark:text-slate-50 md:text-xl md:font-semibold">Information</h6>
          <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-300 md:text-base">
            <Link
              className={`hover:text-indigo-500 cursor-pointer`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to="home"
            >
              Home
            </Link>
            <Link
              className={`hover:text-indigo-500 cursor-pointer`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to="about"
            >
              About
            </Link>
            <Link
              className={`hover:text-indigo-500 cursor-pointer`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to="skill"
            >
              Skill
            </Link>
            <Link
              className={`hover:text-indigo-500 cursor-pointer`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to="portfolio"
            >
              Portfolio
            </Link>
            <Link
              className={`hover:text-indigo-500 cursor-pointer`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              to="contact"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="footer__adress flex flex-col gap-2">
          <h6 className="font-semibold text-slate-700 dark:text-slate-50 md:text-xl md:font-semibold">Adress</h6>
          <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-300 md:text-base">
            <p>{user.city}</p>
            <p>
              {user.regency} - {user.country}
            </p>
            <p>{user.mobile}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </motion.section>
    </footer>
  ) : null
}
