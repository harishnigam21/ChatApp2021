import express from "express";
import { profileMedia, updateProfile } from "../controllers/Profile.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import { updateValidation } from "../middlewares/validations/Profile.js";
import ValidateID from "../middlewares/validations/mongooseIDValidation.js";
const router = express.Router();
router.route("/update").patch(jwtVerifier, updateValidation, updateProfile);
router.route("/media/:id").get(ValidateID, jwtVerifier, profileMedia);
export default router;
