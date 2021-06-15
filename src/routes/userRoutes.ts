import { Express } from "express";
import validateRequest from "../middlewares/validateRequest";
import { createUserSchema } from "../schema/user.schema";
import {
  createUserHandler,
  loginUserHandler,
} from "../controller/user.controller";

export default function (app: Express) {
  // create user
  app.post("/users", validateRequest(createUserSchema), createUserHandler);

  // login user
  app.post("/users/login", loginUserHandler);
}