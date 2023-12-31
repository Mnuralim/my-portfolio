import React from 'react'
import Form from './components/Form'
import { getSkillData } from '@/lib/skill'
import { ISkill } from '../../../../../types'

const Page = async () => {
  const getSkills = await getSkillData()
  const skills: ISkill[] = getSkills.data
  return (
    <section className="w-full px-7 py-5 mb-20">
      <Form skills={skills} />
    </section>
  )
}

export default Page
