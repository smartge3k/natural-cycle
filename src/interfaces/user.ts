import { Document } from 'mongoose'

export default interface IUser extends Document {
  phone: string
  name: string
  email: string
}
