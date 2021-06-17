import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";
import { ISessionDocument } from "../interfaces/ISessionDocument";
import UserSession from "../models/userSessionModel";

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
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return user;
}

export async function findUser(query: FilterQuery<IUser>) {
  return User.findOne(query).lean();
}

export async function updateSession(
  query: FilterQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>
) {
  return UserSession.updateOne(query, update);
}
