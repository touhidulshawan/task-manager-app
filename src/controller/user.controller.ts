import { IUser } from "./../interfaces/IUser";
import { Request, Response } from "express";
import { createUser, validatePassword } from "../services/user.services";

async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
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
  } catch (error: any) {
    return res.status(404).send(error.message);
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

export default { createUserHandler, loginUserHandler, logoutUserHandler };
