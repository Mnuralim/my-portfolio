import User from '@/model/user'
import imagekit from '@/utils/imagekit'
import { NextRequest, NextResponse } from 'next/server'
import { IUser } from '../../../../../types'

interface Params {
  params: {
    id: string
  }
}

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { id } = params
  const formData = await req.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  const mobile = formData.get('mobile')
  const about = formData.get('about')
  const about2 = formData.get('about2')
  const position = formData.get('position')
  const city = formData.get('city')
  const regency = formData.get('regency')
  const country = formData.get('country')
  const github = formData.get('github')
  const linkedin = formData.get('linkedin')
  const instagram = formData.get('instagram')
  const imageProfile = formData.get('imageProfile') as File
  const cv = formData.get('cv') as File

  const findUser: IUser | null = await User.findById(id)
  if (!findUser) {
    return NextResponse.json(
      {
        message: 'User not found',
        ok: false,
      },
      {
        status: 404,
      }
    )
  }
  let imageUrl = findUser.imageProfile
  if (imageProfile.toString() != findUser.imageProfile) {
    const imageArrayBuffer = await imageProfile.arrayBuffer()
    const imageBuffer = Buffer.from(imageArrayBuffer)

    const uploadFile = await imagekit.upload({
      file: imageBuffer,
      fileName: `my-image-porfile${Date.now()}`,
      folder: 'portoku',
    })
    imageUrl = uploadFile.url
  }

  let cvUrl = findUser.cv
  if (cv.toString() != findUser.cv) {
    const cvArrayBuffer = await cv.arrayBuffer()
    const cvBuffer = Buffer.from(cvArrayBuffer)

    const uploadFile = await imagekit.upload({
      file: cvBuffer,
      fileName: `my-cv${Date.now()}`,
    })
    cvUrl = uploadFile.url
  }

  await User.findByIdAndUpdate(id, {
    name,
    email,
    mobile,
    about,
    about2,
    position,
    city,
    regency,
    country,
    github,
    linkedin,
    instagram,
    imageProfile: imageUrl,
    cv: cvUrl,
  })

  return NextResponse.json({
    message: 'Success',
    ok: true,
  })
}
