import { UserModel, IUserModel, IUser } from '../models/userModel';

export async function createUser(user: IUser): Promise<IUserModel> {
  try {
    return await UserModel.create(user);
  } catch (err) {
    throw err;
  }
}

export async function getUserByEmail(email: string): Promise<IUserModel | null> {
  try {
    return await UserModel.findOne({ email });
  } catch (err) {
    throw err;
  }
}

export async function getUserById(id: string): Promise<IUserModel | null> {
  try {
    return await UserModel.findById(id);
  } catch (err) {
    throw err;
  }
}
