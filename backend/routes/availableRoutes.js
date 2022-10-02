import express from "express";
const router = express.Router();
import { checkForServer } from "../controllers/availableServers.js";
import { loginAuth } from "../middelware/AuthMiddleware.js";

router.route("/").post(checkForServer);

export default router;
