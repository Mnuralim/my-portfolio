import React from 'react'
import { IPorto } from '../../../../types'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  description: string
  link: string
  tools: string[]
  title: string
  frontendCode: string
  backendCode: string
}

const DetailPorto = ({ backendCode, description, frontendCode, link, title, tools }: Props) => {
  return (
    <div className="w-3/5 p-10 flex justify-center items-center">
      <div className=" border p-3 md:p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Project Description</h2>
        <p className="text-white mb-4">{description}</p>
        <div className="mb-4">
          <h3 className="text-white font-bold mb-2">Tools:</h3>
          <div className="flex space-x-4 items-center flex-wrap gap-y-3">
            {tools.map((tool, index) => (
              <Image key={index} width={1000} height={1000} src={tool} alt="Logo" className="h-8 w-8" />
            ))}
          </div>
        </div>
        <div className="flex gap-2 items-center mt-7">
          <Link
            href={link}
            className="bg-primary-dark-blue text-white px-4 py-2 rounded-md hover:bg-primary-dark-blue/80"
            target="_blank"
          >
            Go to project
          </Link>
          <Link
            href={frontendCode}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-500/80"
            target="_blank"
          >
            Frontend
          </Link>
          <Link
            href={backendCode}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-500/80"
            target="_blank"
          >
            Backend
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DetailPorto
