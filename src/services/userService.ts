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
    const userDoc = await UserModel.create(user);

    return {
      id: userDoc.id,
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password
    };
  } catch (err) {
    throw err;
  }
}

export async function getUserByEmail(email: string): Promise<OmitUser | null> {
  try {
    const userDoc = await UserModel.findOne({ email });

    return userDoc && {
      id: userDoc.id,
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password
    };
  } catch (err) {
    throw err;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const userDoc = await UserModel.findById(id);

    return userDoc && {
      id: userDoc.id,
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password
    }
  } catch (err) {
    throw err;
  }
}
