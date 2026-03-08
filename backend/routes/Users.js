import express from "express";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import { getAllUsers, getRelativeUsers } from "../controllers/Users.js";
const router = express.Router();
router.route("/all").get(jwtVerifier, getAllUsers);
router.route("/relative").get(jwtVerifier, getRelativeUsers);
export default router;
