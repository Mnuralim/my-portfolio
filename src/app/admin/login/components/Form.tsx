'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Form = () => {
  const [form, setForm] = useState({
    password: '',
    email: '',
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })
      if (data?.ok) {
        router.push('/admin/profile')
      } else {
        throw new Error(data?.error || 'Something went wrong')
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-5 w-1/4">
      <label htmlFor="email" className="text-[#b7bac1] mb-2 inline-block">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your email"
        value={form.email}
        onChange={handleInputChange}
      />
      <label htmlFor="password" className="text-[#b7bac1] my-2 inline-block">
        Password
      </label>
      <input
        type="password"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your password"
        id="password"
        value={form.password}
        onChange={handleInputChange}
      />

      <button type="submit" className="mt-5 rounded h-11 w-full bg-indigo-500">
        Sign In
      </button>
    </form>
  )
}

export default Form
