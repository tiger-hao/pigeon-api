import { UserModel, UserDocument } from '../models/userModel';

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
    const userDoc = await UserModel.findOne({ email });

    return userDoc && userDoc.toJSON();
  } catch (err) {
    throw err;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const userDoc = await UserModel.findById(id, '-password');

    return userDoc && userDoc.toJSON();
  } catch (err) {
    throw err;
  }
}

export async function getUsersByName(name: string | undefined): Promise<User[]> {
  const re = new RegExp(name, 'i');

  try {
    const userDocs = await UserModel.find(
      {
        $or: [
          { 'name.first': re },
          { 'name.last': re }
        ]
      },
      '-password'
    );

    return userDocs.map((userDoc: UserDocument) => userDoc.toJSON());
  } catch (err) {
    throw err;
  }
}
