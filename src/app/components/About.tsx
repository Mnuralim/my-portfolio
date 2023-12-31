'use client'
import { motion } from 'framer-motion'
import React, { useMemo } from 'react'
import { slideIn } from '@/utils/motion'
import { IUser } from '../../../types'
import { IoMdCloudDownload } from 'react-icons/io'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  user: IUser
}

export default function About({ user }: Props) {
  const handleButtonDownload = async () => {
    const url = user.cv
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed')
      }
      const blob = await response.blob()
      const urlBlob = window.URL.createObjectURL(blob)
      console.log(urlBlob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = urlBlob
      a.download = `cv-${user.name}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(urlBlob)
      document.body.removeChild(a)
    } catch (error) {
      console.error('An error ocured:', error)
    }
  }
  return (
    <section className="relative mt-10 p-5 lg:px-16" id="about">
      <h1 className="mt-10 mb-10 text-4xl font-bold text-center text-slate-700 lg:text-5xl  dark:text-slate-50">
        About <span className="text-indigo-500">Me</span>
      </h1>
      <div className="flex flex-col items-center gap-3 justify-center md:mt-5 md:gap-5 lg:flex-row lg:gap-48">
        <motion.div
          variants={slideIn('left', 'tween', 0.5, 1.5)}
          initial="hidden"
          whileInView="show"
          className={`bg-indigo-500 w-72 overflow-hidden rounded-xl lg:w-[450px]`}
        >
          <Avatar className="w-full h-full mt-5 rounded-none">
            <AvatarImage src={user.imageProfile} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </motion.div>
        <motion.div
          variants={slideIn('right', 'tween', 0.5, 1.5)}
          initial="hidden"
          whileInView="show"
          className=" text-center text-slate-700 md:text-left"
        >
          <h1 className="text-2xl font-bold text-slate-700 md:text-4xl dark:text-slate-50 ">
            {user.name.slice(0, user.name.indexOf(' ') + 1)}
            <span className="text-indigo-500">{user.name.slice(user.name.indexOf(' ') + 1)}</span>
          </h1>
          <p className="mt-5 text-slate-500 dark:text-slate-50 md:w-96 lg:w-80">{user.about2}</p>
          <button
            onClick={handleButtonDownload}
            className={`flex items-center justify-center gap-2 bg-indigo-500 mx-auto mt-5 w-40 rounded-xl py-2 text-center text-white md:mx-0 `}
          >
            <IoMdCloudDownload size="23" /> Download CV
          </button>
        </motion.div>
      </div>
    </section>
  )
}
