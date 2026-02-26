import express from "express";
import { updateProfile } from "../controllers/Profile.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import { updateValidation } from "../middlewares/validations/Profile.js";
const router = express.Router();
router.route("/user").patch(jwtVerifier, updateValidation, updateProfile);
export default router;
