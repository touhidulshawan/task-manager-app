import { Document } from "mongoose";
import { ObjectID } from "mongodb";

export interface IUser extends Document {
  _id: ObjectID;
  name: string;
  email: string;
  password: string;
  age?: number;
  tokens: Array<{ _id: ObjectID; token: string }>;
  avatar?: Buffer;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(userPassword: string): Promise<boolean>;

  generateAuthToken(): string;
}
