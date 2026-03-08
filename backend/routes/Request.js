import express from "express";
import ValidateID from "../middlewares/validations/mongooseIDValidation.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import {
  acceptRequest,
  allRequest,
  rejectRequest,
} from "../controllers/Request.js";
const router = express.Router();
router.route("/all").get(jwtVerifier, allRequest);
router.route("/accept/:id").patch(ValidateID, jwtVerifier, acceptRequest);
router.route("/reject/:id").patch(ValidateID, jwtVerifier, rejectRequest);
export default router;
