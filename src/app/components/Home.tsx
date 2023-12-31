'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { slideIn } from '@/utils/motion'
import { VscSend } from 'react-icons/vsc'
import { IUser } from '../../../types'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  user: IUser
}

const HomePage = ({ user }: Props) => {
  return (
    <section id="home" className="relative p-5 lg:px-16">
      <div className="relative z-50 grid md:grid-cols-2 items-center  gap-5 md:h-screen md:gap-5 lg:flex-row-reverse lg:gap-48">
        <motion.div
          variants={slideIn('right', 'tween', 0.5, 1.5)}
          initial="hidden"
          whileInView="show"
          className="bg-indigo-500 mx-auto px-5 w-80 h-80 min-w-80 blob opacity-100 overflow-hidden lg:h-[450px] lg:w-[450px] md:order-2"
        >
          <Avatar className="w-full h-full mt-5">
            <AvatarImage src={user.imageProfile} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </motion.div>
        <motion.div
          variants={slideIn('left', 'tween', 0.5, 1.5)}
          initial="hidden"
          whileInView="show"
          className="text-center md:mt-0 md:text-left md:order-1"
        >
          <h1 className="text-2xl font-bold text-slate-700 md:text-4xl dark:text-slate-50 ">
            Hi! I&apos;m {user.name.slice(0, user.name.indexOf(' ') + 1)}
            <span className="text-indigo-500">{user.name.slice(user.name.indexOf(' ') + 1)}</span>
          </h1>
          <h6 className="mt-1 text-xl font-normal text-slate-600 dark:text-slate-400">{user.position}</h6>
          <p className="mt-3 mb-3 text-base leading-7 text-slate-500 lg:w-96 dark:text-slate-50">{user.about}</p>
          <div className="flex justify-center md:justify-start">
            <Link
              href={`https://wa.me/${user.mobile}`}
              target="_blank"
              className="px-4 py-2 flex items-center text-white bg-indigo-500 rounded "
            >
              <VscSend className="mr-2" />
              <p>Contact Me</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomePage
