import Image from 'next/image'
import React from 'react'
import { IPorto, ISkill } from '../../../../../types'
import Form from './components/Form'
import { getPortoById } from '@/lib/porto'
import { getSkillData } from '@/lib/skill'

interface Params {
  params: {
    id: string
  }
}

const Page = async ({ params }: Params) => {
  const getPorto = await getPortoById(params.id)
  const porto: IPorto = getPorto.data
  const getSkills = await getSkillData()
  const skills: ISkill[] = getSkills.data
  return (
    <section className="w-full px-7 py-5 mb-20">
      <Form skills={skills} porto={porto} />
    </section>
  )
}

export default Page
