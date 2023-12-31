import Porto from '@/model/portfolio'
import { db } from '@/utils/db'
import imagekit from '@/utils/imagekit'
import { NextRequest, NextResponse } from 'next/server'
import { IPorto } from '../../../../../types'

db()

interface Params {
  params: {
    id: string
  }
}
export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params
  try {
    const porto = await Porto.findById(id)
    return NextResponse.json({
      message: 'Success',
      ok: true,
      data: porto,
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
    const image = formData.get('image') as File
    const link = formData.get('link')
    const description = formData.get('description')
    const frontendCode = formData.get('frontendCode')
    const backendCode = formData.get('backendCode')
    const tools = formData.get('tools') as string

    const findPorto: IPorto | null = await Porto.findById(id)
    if (!findPorto) {
      return NextResponse.json(
        {
          message: 'Data not found',
          ok: false,
        },
        {
          status: 404,
        }
      )
    }

    const toolsArray = tools.split(',')

    let imageUrl = findPorto.image
    if (image.toString() != findPorto.image) {
      const imageArrayBuffer = await image.arrayBuffer()
      const imageBuffer = Buffer.from(imageArrayBuffer)

      const uploadFile = await imagekit.upload({
        file: imageBuffer,
        fileName: `my-porto${Date.now()}`,
        folder: 'portoku',
      })
      imageUrl = uploadFile.url
    }

    await Porto.findByIdAndUpdate(id, {
      title,
      link,
      description,
      frontendCode,
      backendCode,
      image: imageUrl,
      tools: toolsArray,
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

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = params
  try {
    const findPorto: IPorto | null = await Porto.findById(id)
    if (!findPorto) {
      return NextResponse.json(
        {
          message: 'Data not found',
          ok: false,
        },
        {
          status: 404,
        }
      )
    }
    await Porto.findByIdAndDelete(id)

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
