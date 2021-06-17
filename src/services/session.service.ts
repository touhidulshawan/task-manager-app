import UserSession from "../models/userSessionModel";
import { LeanDocument } from "mongoose";
import { get } from "lodash";
import { IUser } from "../interfaces/IUser";
import { ISessionDocument } from "../interfaces/ISessionDocument";
import config from "../config/default";
import { decode, sign } from "../utils/jwt.utils";
import { findUser } from "./user.services";

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

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // decode the refresh token
  const { decoded } = decode(refreshToken);
  if (!decoded || get(decoded, "_id")) return false;

  // get the session
  const session = await UserSession.findById(get(decoded, "_id"));

  // make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;
  return createAccessToken({ user, session });
}
