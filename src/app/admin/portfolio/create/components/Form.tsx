'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaCamera } from 'react-icons/fa'
import { IPorto, ISkill } from '../../../../../../types'
import { createPorto } from '@/lib/porto'
import { customRevalidatePath } from '@/lib/action'
import { useRouter } from 'next/navigation'

interface Props {
  skills: ISkill[]
}

const Form = ({ skills }: Props) => {
  const [form, setForm] = useState({
    title: '',
    link: '',
    backendCode: '',
    frontendCode: '',
    selectedSkills: Object.fromEntries(skills.map((skill) => [skill, true])) as Record<string, boolean>,
  })
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState<null | ArrayBuffer | string>(null)
  const [image, setImage] = useState<null | ArrayBuffer | string | File>(null)
  const [isLoading, setIsLoading] = useState(false)

  const selectedSkills = Object.keys(form.selectedSkills).filter((logo) => form.selectedSkills[logo])
  const router = useRouter()

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
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCheckboxChange = (logo: string) => {
    setForm((prevData) => ({
      ...prevData,
      selectedSkills: {
        ...prevData.selectedSkills,
        [logo]: !prevData.selectedSkills[logo],
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('link', form.link)
      formData.append('backendCode', form.backendCode)
      formData.append('frontendCode', form.frontendCode)
      formData.append('description', description)
      formData.append('tools', selectedSkills.join(','))
      formData.append('image', image as any)

      const response = await createPorto(formData)
      if (response?.ok) {
        alert('Success')
        customRevalidatePath('/admin/portfolio')
        router.push('/admin/portfolio')
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
    <form onSubmit={handleSubmit} className="w-full gap-10 flex">
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
              <FaCamera size="40" />
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
            value={form.title}
            onChange={handleInputChange}
          />
          <label htmlFor="link" className="text-[#b7bac1] my-2 inline-block">
            Link project
          </label>
          <input
            type="text"
            id="link"
            className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
            placeholder="Link"
            value={form.link}
            onChange={handleInputChange}
          />
          <label htmlFor="frontendCode" className="text-[#b7bac1] my-2 inline-block">
            Frontend code
          </label>
          <input
            type="text"
            id="frontendCode"
            className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
            placeholder="Frontend source code"
            value={form.frontendCode}
            onChange={handleInputChange}
          />

          <label htmlFor="backendCode" className="text-[#b7bac1] my-2 inline-block">
            Backend code
          </label>
          <input
            type="text"
            id="backendCode"
            className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
            placeholder="Your backendCode"
            value={form.backendCode}
            onChange={handleInputChange}
          />
          <label htmlFor="frontendCode" className="text-[#b7bac1] my-2 inline-block">
            Tools
          </label>
          <div className="flex gap-4 flex-wrap">
            {skills.map((skill, index) => (
              <label key={skill._id}>
                <input
                  type="checkbox"
                  id={skill.title}
                  value={skill.logo}
                  onChange={() => handleCheckboxChange(skill.logo)}
                />
                {skill.title}
              </label>
            ))}
          </div>
          <label htmlFor="description" className="text-[#b7bac1] my-2 inline-block">
            Description
          </label>
          <textarea
            id="description"
            className="w-full bg-hard-color py-2 px-4 border border-slate-600 rounded outline-none"
            placeholder="Description"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input id="logo" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />

          <button disabled={isLoading} type="submit" className="mt-8 rounded h-11 w-full bg-indigo-500">
            {!isLoading ? 'Create' : <span className="spinner"></span>}
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
