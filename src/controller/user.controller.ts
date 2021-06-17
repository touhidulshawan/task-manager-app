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

export default { createUserHandler };
