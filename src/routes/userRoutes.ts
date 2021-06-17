import { Express } from "express";
import validateRequest from "../middlewares/validateRequest";
import { createUserSchema } from "../schema/user.schema";
import controller from "../controller/user.controller";

export default function (app: Express) {
  // create user
  app.post(
    "/users",
    validateRequest(createUserSchema),
    controller.createUserHandler
  );
}
