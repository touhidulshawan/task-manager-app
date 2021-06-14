import { DocumentDefinition } from "mongoose";
import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";

export async function createUser(input: DocumentDefinition<IUser>) {
  try {
    return await User.create(input);
  } catch (err) {
    throw new Error(err);
  }
}
