import mongoose, { Schema } from 'mongoose'
import { IPorto } from '../../types'

const PortoSchema = new mongoose.Schema<IPorto>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    frontendCode: {
      type: String,
      required: true,
    },
    backendCode: {
      type: String,
      required: true,
    },
    tools: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Porto = mongoose.models.Porto || mongoose.model<IPorto>('Porto', PortoSchema)

export default Porto
