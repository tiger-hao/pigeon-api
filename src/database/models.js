import { model } from 'mongoose';
import { userSchema } from './schema/user';

export const UserModel = model("User", userSchema);
