import { model, Document, Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document { }

const userSchema = new Schema(
  {
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

export const UserModel = model<IUserModel>('User', userSchema);
