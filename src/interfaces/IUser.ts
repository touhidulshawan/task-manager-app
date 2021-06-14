import { Document } from "mongoose";
import { ObjectID } from "mongodb";

export interface IUser extends Document {
  _id: ObjectID;
  name: string;
  email: string;
  password: string;
  age?: number;
  avatar?: Buffer;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPassword: string): Promise<boolean>;
}
