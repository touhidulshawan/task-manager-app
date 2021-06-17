import { IUser } from "../interfaces/IUser";
import { Request, Response } from "express";
import { createUser, validatePassword } from "../services/user.services";
import signJWT from "../functions/signJWT";
import User from "../models/userModel";
import { ObjectID } from "mongodb";

// save signedInUser
const saveSignedUser = (req: Request, res: Response, user: IUser): void => {
  signJWT(user, async (error, token) => {
    if (error) {
      return res.status(401).send("Invalid username or password");
    } else if (token) {
      const _id = new ObjectID();
      user.tokens.concat({ _id, token });
      await user.save();
      res.status(200).json({
        message: "Auth successful",
        user,
        token,
      });
    }
  });
};

// create new user
async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    saveSignedUser(req, res, user);
    res.send(user);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

// login handler
async function loginUserHandler(req: Request, res: Response) {
  try {
    const user: IUser | false = await validatePassword(req.body);

    if (user === false) {
      return res.status(401).send("Invalid username or password");
    }
    saveSignedUser(req, res, user);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
}

// get user profile after authorization

async function getUserProfile(req: Request, res: Response) {
  try {
    const user = await User.findOne({ email: res.locals.jwt.email });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

// logout handler
export async function logoutUserHandler(req: Request, res: Response) {
  try {
    res.status(200).send({ message: "user logout" });
  } catch (error: any) {
    res.status(401).send(error.message);
  }
}

export default {
  createUserHandler,
  loginUserHandler,
  getUserProfile,
  logoutUserHandler,
};
