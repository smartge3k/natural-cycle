import mongoose from 'mongoose'
require('dotenv').config({ path: process.cwd() + '/.env' })

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@testing.8s3ofmq.mongodb.net/?retryWrites=true&w=majority`

export async function connect() {
  try {
    await mongoose.connect(uri)
  } catch (e) {
    console.log(e)
  }
}
