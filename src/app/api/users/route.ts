import User from '@/model/user'
import { db } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

db()

export const POST = async (req: NextRequest) => {
  try {
    const { email, password, name, mobile, about, position, city, regency, country, github, linkedin, instagram, cv } =
      await req.json()
    if (!email || !password || !name || !mobile || !about || !position) {
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

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      email,
      name,
      mobile,
      about,
      position,
      city,
      regency,
      country,
      github,
      linkedin,
      instagram,
      cv,
      password: hashedPassword,
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
    const users = await User.find()
    return NextResponse.json({
      message: 'Success',
      ok: true,
      data: users[0],
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
