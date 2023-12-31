'use client'
import React, { useState } from 'react'
import { MdPlayArrow } from 'react-icons/md'
import ThemeToggle from './ThemeToggle'

const Theme = () => {
  const [showTheme, setShowTheme] = useState(false)

  return (
    <div
      className={`fixed md:hidden z-50 flex justify-center items-center text-center bottom-2/3 transition-all ${
        showTheme == false ? '-left-20' : 'left-0'
      }`}
    >
      <div className="flex flex-col items-center justify-center w-20 h-20 gap-3 rounded-r-xl bg-white/60 backdrop-blur-md dark:bg-slate-700/60">
        <h1 className="text-base font-semibold">Theme</h1>
        <ThemeToggle />
      </div>
      <div>
        <button
          className="flex items-center justify-center w-12 h-12 text-2xl bg-white rounded-r-full bg-white/60 text-slate-600 backdrop-blur-md dark:bg-slate-700/60 transition-all duration-[400ms] dark:text-white"
          onClick={() => setShowTheme((prev) => !prev)}
        >
          <MdPlayArrow className={` transition-all duration-[400ms] ${showTheme ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  )
}

export default Theme
