import express from "express";
const router = express.Router();
import { login, register } from "../controllers/login.js";

router.route("/").post(login);
router.route("/register").post(register);

export default router;
