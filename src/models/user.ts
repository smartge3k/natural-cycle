import mongoose, { Schema } from 'mongoose'
import IUser from '../interfaces/user'

const UserSchema: Schema = new Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
})

export default mongoose.model<IUser>('User', UserSchema)
