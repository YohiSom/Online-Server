import express from "express";
const router = express.Router();
import { activateLicense } from "../controllers/activateLicense.js";

router.route("/").post(activateLicense);

export default router;
