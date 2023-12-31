'use client'
import React from 'react'
import { useThemeContext } from '../../../context/theme'
import { FiMoon } from 'react-icons/fi'
import { CgSun } from 'react-icons/cg'

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext()
  return (
    <button
      onClick={() =>
        setTheme((prev) => {
          if (prev === 'dark') {
            return 'light'
          } else {
            return 'dark'
          }
        })
      }
      className="md:ml-10"
    >
      {theme === 'dark' ? <CgSun size="22" /> : <FiMoon size="22" />}
    </button>
  )
}

export default ThemeToggle
