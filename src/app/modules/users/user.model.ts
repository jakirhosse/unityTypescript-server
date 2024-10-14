import { Schema, model } from 'mongoose'
import { TUser } from './user.interfage'

const userSchema = new Schema<TUser>({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  avatar: { type: String, required: true },
  domain: { type: String, required: true },
  available: { type: Boolean, required: true },
})

export const User = model<TUser>('User', userSchema)