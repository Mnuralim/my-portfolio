import { getUserData } from '@/lib/user'
import Image from 'next/image'
import React from 'react'
import { IUser } from '../../../../types'
import Form from './components/Form'

const Page = async () => {
  const getUser = await getUserData()
  const user: IUser = getUser.data
  return (
    <section className="w-full gap-10 flex px-7 py-5 mb-20">
      <div className="w-1/3">
        <div className="w-full aspect-square bg-soft-color rounded-lg p-5 overflow-hidden">
          <Image src={user.imageProfile} alt="avatar" height={1000} width={1000} className="w-full h-full rounded-lg" />
        </div>
        <div className="w-full mt-4 aspect-[5/7] bg-soft-color rounded-lg p-5 overflow-hidden">
          <div style={{ width: '100%', height: '100%' }}>
            <iframe title="PDF Viewer" src={user.cv} width="100%" height="100%" frameBorder="0" />
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-soft-color">
        <Form user={user} />
      </div>
    </section>
  )
}

export default Page
