import { Request, Response } from "express";
import { createUser, validatePassword } from "../services/user.services";
import User from "../models/userModel";

// create new user
async function createUserHandler(req: Request, res: Response) {
  try {
    const { user, token } = await createUser(req.body);
    res.status(201).send({ user, token });
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

// login handler
async function loginUserHandler(req: Request, res: Response) {
  try {
    const getUser = await validatePassword(req.body);

    if (!getUser) {
      return res.status(400).send("Invalid username or password");
    }
    const { user, token } = getUser;
    res.status(200).send({ user, token });
  } catch (error: any) {
    return res.status(401).send(error.message);
  }
}

// get user profile after authorization

async function getUserProfile(req: Request, res: Response) {
  try {
    const user = await User.findById(res.locals.jwt._id);
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
  // ! WRONG SOLUTION
  // try {
  //   let token: string | null = res.locals.currentToken;
  //   const user = await User.findById(res.locals.jwt._id);
  //   if (!user) {
  //     return res.status(401).send("Unauthorized user");
  //   }
  //   user.tokens.filter((t) => t.token !== token);
  //   await user.save();
  //   token = null;
  //   res.status(200).send({ token, message: "user logout successfully" });
  // } catch (error: any) {
  //   res.status(401).send(error.message);
  // }
}

export default {
  createUserHandler,
  loginUserHandler,
  getUserProfile,
  logoutUserHandler,
};
