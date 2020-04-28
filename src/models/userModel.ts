import { model, Document, Schema, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';

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

userSchema.pre<IUserModel>('save', async function (next: HookNextFunction) {
  const user = this;

  try {
    const encrypted = await bcrypt.hash(user.password, 10);
    user.password = encrypted;
    next();
  } catch (err) {
    next(err);
  }
});

export const UserModel = model<IUserModel>('User', userSchema);
