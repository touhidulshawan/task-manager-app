import { Request, Response } from "express";
import { createUser, validatePassword } from "../services/user.services";
import { createAccessToken, createSession } from "../services/session.service";
import { IUser } from "../interfaces/IUser";
import { sign } from "../utils/jwt.utils";
import config from "../config/default";

async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

async function userLoginHandler(req: Request, res: Response) {
  //TODO: VALIDATE USER EMAIL AND PASSWORD
  const user: IUser | false = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }
  // TODO: CREATE A USER SESSION
  const session = await createSession(
    user._id.toString(),
    req.get("user-agent") || ""
  );
  // TODO: CREATE A ACCESS TOKEN
  const accessToken = createAccessToken({
    user,
    session,
  });
  // TODO: CREATE A REFRESH TOKEN
  const refreshToken = sign(session, {
    expiresIn: config.tokenConfig.refreshTokenTime,
  });
  // TODO: SEND ACCESS AND REFRESH TOKEN BACK
  return res.send({ accessToken, refreshToken });
}

export default { createUserHandler, userLoginHandler };
