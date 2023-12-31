'use client'
import React, { useState } from 'react'
import { IPorto, ISkill } from '../../../../../../types'
import Image from 'next/image'
import { customRevalidatePath } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { updatePorto } from '@/lib/porto'

interface Props {
  porto: IPorto
  skills: ISkill[]
}

const Form = ({ porto, skills }: Props) => {
  const [form, setForm] = useState({
    title: porto.title,
    link: porto.link,
    backendCode: porto.backendCode,
    frontendCode: porto.frontendCode,
    selectedSkills: Object.fromEntries(porto.tools.map((tool) => [tool, true])) as Record<string, boolean>,
  })
  const [description, setDescription] = useState(porto.description)
  const [thumbnail, setThumbnail] = useState<null | ArrayBuffer | string>(null)
  const [image, setImage] = useState<null | ArrayBuffer | string | File>(porto.image)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const selectedSkills = Object.keys(form.selectedSkills).filter((logo) => form.selectedSkills[logo])

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

      const response = await updatePorto(porto._id, formData)
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
          htmlFor="image"
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
            <Image src={porto.image} alt="avatar" height={1000} width={1000} className="w-full h-full rounded-lg" />
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
                  checked={form.selectedSkills[skill.logo]}
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
          <input id="image" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />

          <button disabled={isLoading} type="submit" className="mt-8 rounded h-11 w-full bg-indigo-500">
            {!isLoading ? 'Create' : <span className="spinner"></span>}
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
