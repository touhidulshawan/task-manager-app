import * as jwt from "jsonwebtoken";
import config from "../config/default";

const privateKey = config.tokenConfig.privateKey;

export function sign(object: Object, option?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, option);
}
