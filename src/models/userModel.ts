import { model, Document, Schema } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  password: string;
}

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
      required: true,
    }
  }
);

export const UserModel = model<IUserModel>("User", userSchema);
