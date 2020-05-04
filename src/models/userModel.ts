import { model, Document, Schema } from 'mongoose';

export interface IUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document { }

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

export const UserModel = model<IUserModel>('User', userSchema);
