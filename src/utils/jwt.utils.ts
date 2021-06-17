import * as jwt from "jsonwebtoken";
import config from "../config/default";
import log from "../logger";

const privateKey = config.tokenConfig.privateKey;

export function sign(object: Object, option?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, option);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    log.error(error);
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
