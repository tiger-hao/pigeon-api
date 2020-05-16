import { model, Document, Schema } from 'mongoose';
import { User } from '../services/userService';

export type UserDocument = Omit<User, 'id'> & Document;

const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
        trim: true
      },
      last: {
        type: String,
        required: true,
        trim: true
      }
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  }
);

export const UserModel = model<UserDocument>('User', userSchema);
