import Skill from '@/model/skill'
import { db } from '@/utils/db'
import imagekit from '@/utils/imagekit'
import { NextRequest, NextResponse } from 'next/server'

db()

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData()
    const title = formData.get('title')
    const type = formData.get('type')
    const logo = formData.get('logo') as File

    if (!title || !type || !logo) {
      return NextResponse.json(
        {
          message: 'All field required',
          ok: false,
        },
        {
          status: 400,
        }
      )
    }
    const logoArrayBuffer = await logo.arrayBuffer()
    const logoBuffer = Buffer.from(logoArrayBuffer)

    const uploadFile = await imagekit.upload({
      file: logoBuffer,
      fileName: `my-skill${Date.now()}`,
      folder: 'portoku',
    })
    await Skill.create({
      title,
      type,
      logo: uploadFile.url,
    })

    return NextResponse.json({
      message: 'Success',
      ok: true,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        ok: false,
      },
      {
        status: 500,
      }
    )
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const skills = await Skill.find()
    return NextResponse.json({
      message: 'Success',
      ok: true,
      data: skills,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        ok: false,
      },
      {
        status: 500,
      }
    )
  }
}
