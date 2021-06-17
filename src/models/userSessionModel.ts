import mongoose from "mongoose";
import { ISessionDocument } from "../interfaces/ISessionDocument";

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    toObject: {
      transform: function (doc, ret) {},
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
    timestamps: true,
  }
);

const UserSession = mongoose.model<ISessionDocument>("Session", SessionSchema);

export default UserSession;
