import Porto from '@/model/portfolio'
import { db } from '@/utils/db'
import imagekit from '@/utils/imagekit'
import { NextRequest, NextResponse } from 'next/server'

db()

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData()
    const title = formData.get('title')
    const image = formData.get('image') as File
    const link = formData.get('link')
    const description = formData.get('description')
    const frontendCode = formData.get('frontendCode')
    const backendCode = formData.get('backendCode')
    const tools = formData.get('tools') as string

    if (!title || !image || !link || !description || !frontendCode || !backendCode || !tools) {
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
    const toolsArray = tools.split(',')

    const imageArrayBuffer = await image.arrayBuffer()
    const imageBuffer = Buffer.from(imageArrayBuffer)

    const uploadFile = await imagekit.upload({
      file: imageBuffer,
      fileName: `my-porto${Date.now()}`,
      folder: 'portoku',
    })

    await Porto.create({
      title,
      link,
      description,
      frontendCode,
      backendCode,
      image: uploadFile.url,
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

export const GET = async (req: NextRequest) => {
  try {
    const portos = await Porto.find()
    return NextResponse.json({
      message: 'Success',
      ok: true,
      data: portos,
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
