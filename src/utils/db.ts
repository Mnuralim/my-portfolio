import mongoose from 'mongoose'

export const db = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URL as string)
    console.log('Database Connected...')
  } catch (error) {
    console.log(error)
  }
}
