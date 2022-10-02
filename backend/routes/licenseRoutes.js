import express from "express";
const router = express.Router();
import { addLicensesToDb } from "../controllers/server.js";

router.route("/").post(addLicensesToDb);

export default router;
