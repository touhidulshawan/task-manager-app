import { Express } from "express";
import validateRequest from "../middlewares/validateRequest";
import { createUserSchema, userLoginSchema } from "../schema/user.schema";
import controller from "../controller/user.controller";
import extractJWT from "../middlewares/extractJWT";

export default function (app: Express) {
  // create user
  app.post(
    "/users",
    validateRequest(createUserSchema),
    controller.createUserHandler
  );

  // login user
  app.post(
    "/users/login",
    validateRequest(userLoginSchema),
    controller.loginUserHandler
  );
  // get user profile
  app.get("/users/me", extractJWT, controller.getUserProfile);

  // logout user
  app.post("/users/logout", extractJWT, controller.logoutUserHandler);
}
