import express from "express";
import ValidateID from "../middlewares/validations/mongooseIDValidation.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import { unfollow, follow } from "../controllers/Interact.js";
const router = express.Router();
router.route("/unfollow/:id").patch(ValidateID, jwtVerifier, unfollow);
router.route("/follow/:id").post(ValidateID, jwtVerifier, follow);
export default router;
