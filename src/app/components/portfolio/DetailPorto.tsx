import React from 'react'
import { IPorto } from '../../../../types'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
  porto: IPorto
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DetailPorto = ({ porto, setShowModal }: Props) => {
  return (
    <div className="z-[1000]  h-screen fixed inset-0 bg-black/75 flex items-center justify-center">
      <div className="md:w-3/5 h-full w-full md:p-10 flex justify-center items-center ">
        <div className="bg-hard-color w-full h-full md:h-2/3 border p-3 pb-40 md:p-8 rounded-md relative overflow-y-auto">
          <button className="absolute top-3 right-3">
            <AiOutlineClose onClick={() => setShowModal(false)} className="text-white" />
          </button>
          <h2 className="text-2xl font-bold mb-4 mt-3 text-white">Project Description</h2>
          <p className="text-white mb-4">{porto.description}</p>
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">Tools:</h3>
            <div className="flex space-x-4 items-center flex-wrap gap-y-3">
              {porto.tools.map((tool, index) => (
                <Image key={index} width={1000} height={1000} src={tool} alt="Logo" className="h-8 w-8" />
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-center mt-7">
            <Link
              href={porto.link}
              className="bg-primary-dark-blue text-white px-4 py-2 rounded-md hover:bg-primary-dark-blue/80"
              target="_blank"
            >
              Go to project
            </Link>
            <Link
              href={porto.frontendCode}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-500/80"
              target="_blank"
            >
              Frontend
            </Link>
            <Link
              href={porto.backendCode}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-500/80"
              target="_blank"
            >
              Backend
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPorto
