import express from "express";
const router = express.Router();
import { addServerToDb } from "../controllers/server.js";

router.route("/").post(addServerToDb);

export default router;
