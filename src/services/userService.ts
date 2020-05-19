import { UserModel } from '../models/userModel';

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  try {
    return (await UserModel.create(user)).toJSON();
  } catch (err) {
    throw err;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return (await UserModel.findOne({ email })).toJSON();
  } catch (err) {
    throw err;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    return (await UserModel.findById(id)).toJSON();
  } catch (err) {
    throw err;
  }
}
