'use client'
import { slideIn } from '@/utils/motion'
import { motion } from 'framer-motion'
import React from 'react'
import { HiOutlinePhone } from 'react-icons/hi2'
import { MdOutlineMailOutline } from 'react-icons/md'
import { SlLocationPin } from 'react-icons/sl'
import { VscSend } from 'react-icons/vsc'
import { IUser } from '../../../types'

interface Props {
  user: IUser
}

export default function Contact({ user }: Props) {
  return (
    <section className="mt-10 mb-20" id="contact">
      <h1 className="mt-10 mb-5 text-4xl font-bold text-center text-slate-700 lg:text-5xl  dark:text-slate-50">
        Contact <span className="text-indigo-500">Me</span>
      </h1>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 lg:flex-row lg:gap-10">
        <motion.div
          variants={slideIn('left', 'tween', 0.5, 1)}
          initial="hidden"
          whileInView="show"
          className=" contact__info flex w-11/12 flex-col items-center justify-center overflow-hidden rounded-xl bg-white p-10 py-10 shadow-md dark:bg-slate-700 sm:w-2/3 lg:w-2/6 lg:px-0 lg:py-10"
        >
          <motion.div className="flex flex-col justify-center gap-5">
            <div className="flex gap-4">
              <HiOutlinePhone className={`text-xl md:text-3xl`} />
              <div className="flex flex-col">
                <h1 className="font-medium text-slate-600 dark:text-slate-50 md:text-lg ">Call Me</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">{user.mobile}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MdOutlineMailOutline className={`text-xl md:text-3xl`} />
              <div className="flex flex-col">
                <h1 className="font-medium text-slate-600 dark:text-slate-50 md:text-lg">Email</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <SlLocationPin className={`text-xl md:text-3xl`} />
              <div className="flex flex-col">
                <h1 className="font-medium text-slate-600 dark:text-slate-50 md:text-lg">Location</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 md:text-base">
                  {user.city} - {user.regency} - {user.country}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          variants={slideIn('right', 'tween', 0.5, 1)}
          initial="hidden"
          whileInView="show"
          action="https://formspree.io/f/xkndngke"
          method="POST"
          className="contact__form mt-10 flex w-3/4 flex-col items-center justify-center gap-3 rounded-xl bg-white p-7 py-10 shadow-md dark:bg-slate-700 md:mt-5 lg:w-1/3"
        >
          <div className="w-full">
            <label className="text-slate-500 dark:text-slate-200 md:text-lg">Your Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className={`mt-2 block w-full rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500 bg-slate-100 text-sm focus:outline-none dark:bg-slate-500 md:text-base`}
              required
            />
          </div>
          <div className="w-full">
            <label className="text-slate-500 dark:text-slate-200 md:text-lg">Your Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className={`mt-2 block w-full rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500 bg-slate-100 text-sm focus:outline-none dark:bg-slate-500 md:text-base`}
              required
            />
          </div>
          <div className="w-full">
            <label className=" text-slate-500 dark:text-slate-200 md:text-lg">Message :</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`mt-2 block w-full rounded-md bg-slate-100 px-2 py-1 focus:ring-2 dark:bg-slate-500 focus:ring-indigo-500 resize-none text-sm focus:outline-none md:text-base`}
              placeholder="Your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`px-3 py-1 bg-indigo-500 mt-5 flex items-center justify-center gap-1 self-start rounded-md text-slate-50`}
          >
            <p>Send</p> <VscSend className=" ml-1" />
          </button>
        </motion.form>
      </div>
    </section>
  )
}
