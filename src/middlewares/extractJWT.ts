import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, "mysecretkey", (error, decode) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error,
        });
      } else {
        res.locals.jwt = decode;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default extractJWT;
