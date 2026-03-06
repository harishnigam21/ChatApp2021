import express from "express";
import ValidateID from "../middlewares/validations/mongooseIDValidation.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import {
  unfollow,
  follow,
  acceptRequest,
  rejectRequest,
} from "../controllers/Interact.js";
const router = express.Router();
router.route("/unfollow/:id").patch(ValidateID, jwtVerifier, unfollow);
router.route("/follow/:id").post(ValidateID, jwtVerifier, follow);
router
  .route("/follow/accept/:id")
  .patch(ValidateID, jwtVerifier, acceptRequest);
router
  .route("/follow/reject/:id")
  .patch(ValidateID, jwtVerifier, rejectRequest);
export default router;
