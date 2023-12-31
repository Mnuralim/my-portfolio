import mongoose, { Schema } from 'mongoose'
import { IUser } from '../../types'

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    about: {
      type: String,
    },
    about2: {
      type: String,
    },
    imageProfile: {
      type: String,
      default: 'https://ik.imagekit.io/wridvl3du/IMG-CAR-1697927005871_gzHq0MIEv.jpg?updatedAt=1697927009016',
    },
    city: {
      type: String,
    },
    regency: {
      type: String,
    },
    country: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    position: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
