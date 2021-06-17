import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import config from "../config/config";
import log from "../logger";

const NAMESPACES = "AUTH";
log.info(NAMESPACES);

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("Authorization")!.replace("Bearer ", "");
  try {
    jwt.verify(token, config.server.token.secret, (error: any, decode) => {
      if (error) {
        return res.status(404).send({ message: error.message });
      }
      res.locals.jwt = decode;
      res.locals.currentToken = token;
      console.log(res.locals);
      next();
    });
  } catch (err: any) {
    res.status(401).send("Unauthorized access");
  }
};

export default extractJWT;
