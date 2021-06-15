import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IUser";
import validator from "validator";
import { ObjectID } from "mongodb";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => {
          return validator.isEmail(value);
        },
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate: {
        validator: (value: string) => {
          return !value.toLowerCase().includes("password");
        },
        message: "Password can not contain word password",
      },
    },
    age: {
      type: Number,
      default: 0,
      validate: {
        validator: (value: number) => value >= 0,
      },
      message: "Age must be a positive number",
    },
    tokens: {
      type: [{ _id: ObjectID, token: String }],
      required: true,
    },
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 8);
  return next();
});

// used to compare password for login
UserSchema.methods.comparePassword = async function (userPassword: string) {
  const user = this as IUser;
  return bcrypt.compare(userPassword, user.password).catch((err) => false);
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this as IUser;
  const token = jwt.sign({ _id: user._id.toString() }, "mysecretkey");
  const _id = new ObjectID();
  user.tokens = user.tokens.concat({ token, _id });
  await user.save();
  return token;
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
