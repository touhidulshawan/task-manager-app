import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, validatePassword } from "../services/user.services";
import { get } from "mongoose";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const { getUser, token } = await createUser(req.body);
    const user = omit(getUser.toJSON(), ["password", "tokens"]);
    res.send({ user, token });
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

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
