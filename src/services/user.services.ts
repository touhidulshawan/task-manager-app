import { DocumentDefinition } from "mongoose";
import { omit } from "lodash";
import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";

export async function createUser(input: DocumentDefinition<IUser>) {
  try {
    const getUser = await User.create(input);
    const token = await getUser.generateAuthToken();
    return { getUser, token };
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
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}
