import { Express } from "express";
import { validateRequest, requireUser } from "../middlewares";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";
import controller from "../controller/user.controller";

export default function (app: Express) {
  // create user
  app.post(
    "/users",
    validateRequest(createUserSchema),
    controller.createUserHandler
  );

  // login user
  app.post(
    "/users/sessions",
    validateRequest(createUserSessionSchema),
    controller.userLoginHandler
  );

  // logout user
  app.delete(
    "/users/sessions",
    requireUser,
    controller.invalidateUserSessionHandler
  );
}
