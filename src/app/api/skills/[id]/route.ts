import Skill from '@/model/skill'
import { db } from '@/utils/db'
import imagekit from '@/utils/imagekit'
import { NextRequest, NextResponse } from 'next/server'
import { ISkill } from '../../../../../types'

db()

interface Params {
  params: {
    id: string
  }
}
export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params
  try {
    const skill = await Skill.findById(id)
    return NextResponse.json({
      message: 'Success',
      ok: true,
      data: skill,
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

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = params
  try {
    const skill = await Skill.findById(id)
    if (!skill) {
      return NextResponse.json({
        message: 'Skill not found',
        ok: false,
      })
    }
    await Skill.findByIdAndDelete(id)
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

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { id } = params

  try {
    const formData = await req.formData()
    const title = formData.get('title')
    const type = formData.get('type')
    const logo = formData.get('logo') as File

    const skill: ISkill | null = await Skill.findById(id)
    if (!skill) {
      return NextResponse.json({
        message: 'Skill not found',
        ok: false,
      })
    }

    let logoUrl = skill.logo
    if (logo.toString() != skill.logo) {
      const logoArrayBuffer = await logo.arrayBuffer()
      const logoBuffer = Buffer.from(logoArrayBuffer)
      const uploadFile = await imagekit.upload({
        file: logoBuffer,
        fileName: `my-skill${Date.now()}`,
        folder: 'portoku',
      })
      logoUrl = uploadFile.url
    }

    await Skill.findByIdAndUpdate(id, {
      title,
      type,
      logo: logoUrl,
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
