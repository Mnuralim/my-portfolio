'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { IoLogOutOutline } from 'react-icons/io5'

const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} className="flex items-center gap-3 ">
      <IoLogOutOutline size="20" />
      <span className="font-bold ">Logout</span>
    </button>
  )
}

export default LogoutButton
