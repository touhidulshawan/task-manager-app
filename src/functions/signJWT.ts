import * as jwt from "jsonwebtoken";
import config from "../config/config";
import log from "../logger";
import { IUser } from "../interfaces/IUser";

const NAMESPACE = "AUTH";
log.info(NAMESPACE);

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  let timeSinchEpoch = new Date().getTime();
  let expirationTime =
    timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
  let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  log.info(NAMESPACE, `Try to login token for ${user.name}`);

  try {
    jwt.sign(
      {
        email: user.email,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
    log.error(NAMESPACE, error.message);
    callback(error, null);
  }
};

export default signJWT;
