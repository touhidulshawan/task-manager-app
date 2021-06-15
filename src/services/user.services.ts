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
  const getUser: IUser | null = await User.findOne({ email });

  if (!getUser) {
    return false;
  }
  const isValid = await getUser.comparePassword(password);
  if (!isValid) {
    return false;
  }
  const token = await getUser.generateAuthToken();
  const user = omit(getUser.toJSON(), ["password", "tokens"]);
  return { user, token };
}
