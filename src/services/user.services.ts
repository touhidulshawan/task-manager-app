import { DocumentDefinition } from "mongoose";
import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";

export async function createUser(input: DocumentDefinition<IUser>) {
  try {
    return User.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: IUser["email"];
  password: string;
}) {
  const user: IUser | null = await User.findOne({ email });

  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return user;
}
