'use client'
import React, { useState } from 'react'
import { ISkill } from '../../../../../../types'
import Image from 'next/image'
import { FaCamera } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { updateSkill } from '@/lib/skill'
import { customRevalidatePath } from '@/lib/action'

interface Props {
  skill: ISkill
}

const Form = ({ skill }: Props) => {
  const [title, setTitle] = useState(skill.title)
  const [type, setType] = useState(skill.type)
  const [isLoading, setIsLoading] = useState(false)
  const [thumbnail, setThumbnail] = useState<null | ArrayBuffer | string>(null)
  const [logo, setLogo] = useState<null | ArrayBuffer | string | File>(skill.logo)

  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('type', type)
      formData.append('logo', logo as any)

      const response = await updateSkill(skill._id, formData)
      if (response?.ok) {
        alert('Success')
        customRevalidatePath('/admin/skill')
        router.push('/admin/skill')
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
    <form onSubmit={handleSumbit} className="w-full gap-10 flex">
      <div className="w-1/3">
        <label
          htmlFor="logo"
          className="w-full inline-block cursor-pointer aspect-square bg-soft-color rounded-lg p-5 overflow-hidden"
        >
          {thumbnail ? (
            <Image
              src={thumbnail as string}
              alt="avatar"
              height={1000}
              width={1000}
              className="w-full h-full rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center bg-black/10 w-full h-full ">
              <Image src={skill.logo} alt="avatar" height={1000} width={1000} className="w-full h-full rounded-lg" />
            </div>
          )}
        </label>
      </div>
      <div className="w-2/3 bg-soft-color">
        <div className="p-5">
          <label htmlFor="title" className="text-[#b7bac1] mb-2 inline-block">
            Title
          </label>
          <input
            type="text"
            className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
            placeholder="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="type" className="text-[#b7bac1] my-2 inline-block">
            Type skill
          </label>
          <select
            id="type"
            value={type}
            className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="language">Language</option>
            <option value="tools">Tools</option>
            <option value="library">Library</option>
          </select>
          <input id="logo" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          <button disabled={isLoading} type="submit" className="mt-8 rounded h-11 w-full bg-indigo-500">
            {!isLoading ? 'Update' : <span className="spinner"></span>}
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
