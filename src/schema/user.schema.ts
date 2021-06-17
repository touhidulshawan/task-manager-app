import { object, string, ref, number } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should 8 chars minimum")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain latin letters"),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Password must match"
    ),
    email: string().email("Must be valid email").required("Email is required"),
    age: number().default(0).min(0, "Age must be integer"),
  }),
});

export const createUserSessionSchema = object({
  email: string().email("Must be valid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password is too short - should 8 chars minimum")
    .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain latin letters"),
});
