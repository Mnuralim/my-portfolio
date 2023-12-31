import mongoose, { Schema } from 'mongoose'
import { ISkill } from '../../types'

const skillSchema = new mongoose.Schema<ISkill>(
  {
    title: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', skillSchema)

export default Skill
