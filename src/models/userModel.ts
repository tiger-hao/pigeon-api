import { model, Document, Schema, HookNextFunction } from 'mongoose';
import Joi from '@hapi/joi';

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

export function validateUser(user: IUser) {
  const schema = Joi.object<IUser>({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
  });

  return schema.validate(user);
}

export const UserModel = model<IUserModel>('User', userSchema);
