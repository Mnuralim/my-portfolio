'use client'
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import BottomBar from './BottomBar'
import { usePathname } from 'next/navigation'

const Header = () => {
  const [navbarVisible, setNavbarVisible] = useState(true)
  const pathName = usePathname()
  const isHidden = pathName.startsWith('/admin')

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined
    const handleScroll = () => {
      setNavbarVisible(false)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setNavbarVisible(true)
      }, 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {!isHidden ? (
        <header>
          {navbarVisible ? (
            <>
              <Navbar />
              <BottomBar />
            </>
          ) : null}
        </header>
      ) : null}
    </>
  )
}

export default Header
