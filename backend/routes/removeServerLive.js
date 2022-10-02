import express from "express";
const router = express.Router();
import { removeLiveServer } from "../controllers/serverExpired.js";

router.route("/").post(removeLiveServer);

export default router;
