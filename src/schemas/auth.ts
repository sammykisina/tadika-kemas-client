import { object, string } from "zod";

const login_schema = object({
  email: string({
    required_error: "Email is required.",
  })
    .trim()
    .email({
      message: "Enter a valid email.",
    }),
  password: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(5),
});

const signup_schema = object({
  name: string({
    required_error: "Name is required.",
  })
    .trim()
    .min(5, { message: "Name should be at least 5 characters" }),
  email: string({
    required_error: "Email is required.",
  })
    .trim()
    .email({
      message: "Enter a valid email.",
    }),
  password: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(5),
  password_confirmation: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(5),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirm"],
});

const auth_schemas = { login_schema, signup_schema };

export default auth_schemas;
