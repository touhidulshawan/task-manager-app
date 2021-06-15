import { Request, Response } from "express";
import { createUser, validatePassword } from "../services/user.services";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const { user, token } = await createUser(req.body);
    res.send({ user, token });
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

// login handler
export async function loginUserHandler(req: Request, res: Response) {
  try {
    const getUser = await validatePassword(req.body);

    if (!getUser) {
      return res.status(401).send("Invalid username or password");
    }
    const { user, token } = getUser;
    res.send({ user, token });
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
}

// logout handler
// export async function logoutUserHandler(req: Request, res: Response) {
//  try {
//
//  }
// }
