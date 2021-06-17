import UserSession from "../models/userSessionModel";
import { LeanDocument } from "mongoose";
import { IUser } from "../interfaces/IUser";
import { ISessionDocument } from "../interfaces/ISessionDocument";
import config from "../config/default";
import { sign } from "../utils/jwt.utils";

export async function createSession(userID: string, userAgent: string) {
  const session = await UserSession.create({ user: userID, userAgent });

  return session.toJSON();
}

// create a accessToken
export function createAccessToken({
  user,
  session,
}: {
  user: LeanDocument<IUser>;
  session: LeanDocument<ISessionDocument>;
}) {
  return sign(
    { ...user, session: session._id },
    { expiresIn: config.tokenConfig.expireTokenTime }
  );
}
