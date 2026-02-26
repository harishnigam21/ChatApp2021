import { validateInput } from "./CommonValidation.js";

export const SignUpValidation = (req, res, next) => {
  const { name, email, password } = req.body;

  if (validateInput("name", name, res)) return;
  if (validateInput("email", email, res)) return;
  if (validateInput("password", password, res)) return;

  console.log("SignUp Validation done");
  next();
};
export const SignInValidation = (req, res, next) => {
  const { email } = req.body;
  if (validateInput("email", email, res)) return;
  console.log("SignIn Validation done");
  next();
};
