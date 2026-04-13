import express from "express";
import {
  deleteMessages,
  getMessageKey,
  getRelativeMessages,
  markSeen,
  sendMessage,
} from "../controllers/Message.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import ValidateID from "../middlewares/validations/mongooseIDValidation.js";
import { MessageValidation } from "../middlewares/validations/Message.js";
const router = express.Router();
router.route("/key/:id").get(ValidateID, jwtVerifier, getMessageKey);
router.route("/relative/:id").get(ValidateID, jwtVerifier, getRelativeMessages);
router
  .route("/to/:id")
  .post(ValidateID, jwtVerifier, MessageValidation, sendMessage);
router.route("/mark/:id").patch(ValidateID, jwtVerifier, markSeen);
router.route("/delete/:id").patch(ValidateID, jwtVerifier, deleteMessages);
export default router;
