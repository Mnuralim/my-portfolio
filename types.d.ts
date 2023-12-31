import { Document } from 'mongoose'

interface IUser extends Document {
  name: string
  position: string
  email: string
  mobile: string
  password: string
  imageProfile: string
  about: string
  about2: string
  city: string
  regency: string
  country: string
  github: string
  linkedin: string
  instagram: string
  cv: string
}

interface ISkill extends Document {
  title: string
  logo: string
  type: string
}

interface IPorto extends Document {
  title: string
  image: string
  link: string
  description: string
  tools: [string]
  frontendCode: string
  backendCode: string
}
