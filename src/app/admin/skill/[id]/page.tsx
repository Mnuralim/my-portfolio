import React from 'react'
import Form from './components/Form'
import { getSkillById } from '@/lib/skill'
import { ISkill } from '../../../../../types'

interface Params {
  params: {
    id: string
  }
}

const Page = async ({ params }: Params) => {
  const getSkill = await getSkillById(params.id)
  const skill: ISkill = getSkill.data
  if (!skill) return <div>not found</div>
  return (
    <section className="w-full px-7 py-5 mb-20">
      <Form skill={skill} />
    </section>
  )
}

export default Page
