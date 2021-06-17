import mongoose from "mongoose";
import { IUser } from "./IUser";

export interface ISessionDocument extends mongoose.Document {
  user: IUser["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}
