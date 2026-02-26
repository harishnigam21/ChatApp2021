import express from "express";
import { handleRefresh, SignIn, SignUp } from "../controllers/Auth.js";
import {
  SignInValidation,
  SignUpValidation,
} from "../middlewares/validations/Auth.js";
const router = express.Router();
router.route("/signin").post(SignInValidation, SignIn);
router.route("/signup").post(SignUpValidation, SignUp);
router.route("/refresh").get(handleRefresh);
export default router;
