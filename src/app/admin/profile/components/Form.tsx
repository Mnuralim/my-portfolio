'use client'
import React, { useState } from 'react'
import { IUser } from '../../../../../types'
import { updateUser } from '@/lib/user'
import { customRevalidatePath } from '@/lib/action'

interface Props {
  user: IUser
}

const Form = ({ user }: Props) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.position,
    city: user.city,
    regency: user.regency,
    country: user.country,
    github: user.github,
    linkedin: user.linkedin,
    instagram: user.instagram,
  })
  const [about, setAbout] = useState(user.about)
  const [about2, setAbout2] = useState(user.about2)
  const [isLoading, setIsLoading] = useState(false)
  const [imageProfile, setImageProfile] = useState<string | File | ArrayBuffer>(user.imageProfile)
  const [cv, setCv] = useState<string | File | ArrayBuffer>(user.cv)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageProfile(file)
    }
  }

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCv(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('mobile', form.mobile)
      formData.append('position', form.role)
      formData.append('city', form.city)
      formData.append('regency', form.regency)
      formData.append('country', form.country)
      formData.append('github', form.github)
      formData.append('instagram', form.instagram)
      formData.append('linkedin', form.linkedin)
      formData.append('about', about)
      formData.append('about2', about2)
      formData.append('imageProfile', imageProfile as string)
      formData.append('cv', cv as string)
      const response = await updateUser(user._id, formData)

      if (response?.ok) {
        alert('Update profile success')
        customRevalidatePath('/admin/profile')
      } else {
        throw new Error(response.message)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <label htmlFor="name" className="text-[#b7bac1] mb-2 inline-block">
        Name
      </label>
      <input
        type="text"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your name"
        id="name"
        value={form.name}
        onChange={handleInputChange}
      />
      <label htmlFor="email" className="text-[#b7bac1] my-2 inline-block">
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
      <label htmlFor="mobile" className="text-[#b7bac1] my-2 inline-block">
        Mobile
      </label>
      <input
        type="text"
        id="mobile"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your mobile"
        value={form.mobile}
        onChange={handleInputChange}
      />
      <label htmlFor="role" className="text-[#b7bac1] my-2 inline-block">
        Role
      </label>
      <input
        type="text"
        id="role"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your role"
        value={form.role}
        onChange={handleInputChange}
      />

      <label htmlFor="city" className="text-[#b7bac1] my-2 inline-block">
        City
      </label>
      <input
        type="text"
        id="city"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your city"
        value={form.city}
        onChange={handleInputChange}
      />
      <label htmlFor="regency" className="text-[#b7bac1] my-2 inline-block">
        Regency
      </label>
      <input
        type="text"
        id="regency"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your regency"
        value={form.regency}
        onChange={handleInputChange}
      />
      <label htmlFor="country" className="text-[#b7bac1] my-2 inline-block">
        Country
      </label>
      <input
        type="text"
        id="country"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your country"
        value={form.country}
        onChange={handleInputChange}
      />
      <label htmlFor="github" className="text-[#b7bac1] my-2 inline-block">
        Github
      </label>
      <input
        type="text"
        id="github"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your github"
        value={form.github}
        onChange={handleInputChange}
      />
      <label htmlFor="instagram" className="text-[#b7bac1] my-2 inline-block">
        Instagram
      </label>
      <input
        type="text"
        id="instagram"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your instagram"
        value={form.instagram}
        onChange={handleInputChange}
      />
      <label htmlFor="linkedin" className="text-[#b7bac1] my-2 inline-block">
        Linkedin
      </label>
      <input
        type="text"
        id="linkedin"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="Your Linkedin"
        value={form.linkedin}
        onChange={handleInputChange}
      />
      <label htmlFor="imageProfile" className="text-[#b7bac1] my-2 inline-block">
        Image profile
      </label>
      <input
        type="file"
        id="imageProfile"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        onChange={handleImageChange}
      />
      <label htmlFor="cv" className="text-[#b7bac1] my-2 inline-block">
        CV
      </label>
      <input
        type="file"
        id="cv"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        onChange={handleCvChange}
      />
      <label htmlFor="about" className="text-[#b7bac1] my-2 inline-block">
        About
      </label>
      <textarea
        id="about"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="About you"
        rows={8}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <label htmlFor="about" className="text-[#b7bac1] my-2 inline-block">
        About2
      </label>
      <textarea
        id="about2"
        className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
        placeholder="About you"
        rows={8}
        value={about2}
        onChange={(e) => setAbout2(e.target.value)}
      />
      <button disabled={isLoading} type="submit" className="mt-8 rounded h-11 w-full bg-indigo-500">
        {!isLoading ? 'Update' : <span className="spinner"></span>}
      </button>
    </form>
  )
}

export default Form
