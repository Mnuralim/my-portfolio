'use client'
import React, { useState } from 'react'
import CardList from './CardList'
import { ISkill } from '../../../../types'

interface Props {
  skills: ISkill[]
}

const Skill = ({ skills }: Props) => {
  const [activeSkill, setActiveSkill] = useState<string>('language')

  return (
    <section className="relative mt-10 lg:mt-32" id="skill">
      <div className=" min-h-screen p-5 lg:px-16">
        <h1 className="mt-10 mb-5 text-4xl font-bold text-center text-slate-700 lg:text-5xl  dark:text-slate-50">
          My <span className="text-indigo-500">skill</span>
        </h1>
        <div className=" mt-10 flex justify-center">
          <div className="flex w-full max-w-full space-x-1 rounded-xl bg-slate-300/30 p-1 dark:bg-slate-700/30">
            <button
              className={`transition-colors duration-300 ease-linear w-full rounded-xl ${
                activeSkill == 'language' ? 'bg-indigo-500 text-white' : 'bg-transparent'
              }  text-sm leading-5 font-medium py-3`}
              onClick={() => setActiveSkill('language')}
            >
              Language
            </button>
            <button
              className={`transition-colors duration-300 ease-linear w-full rounded-xl ${
                activeSkill == 'library' ? 'bg-indigo-500 text-white' : 'bg-transparent'
              }  text-sm leading-5 font-medium py-3`}
              onClick={() => setActiveSkill('library')}
            >
              Library
            </button>
            <button
              className={`transition-colors duration-300 ease-linear w-full rounded-xl ${
                activeSkill == 'tools' ? 'bg-indigo-500 text-white' : 'bg-transparent'
              }  text-sm leading-5 font-medium py-3`}
              onClick={() => setActiveSkill('tools')}
            >
              Tools
            </button>
          </div>
        </div>
        <CardList data={skills} filter={activeSkill} />
      </div>
    </section>
  )
}

export default Skill
