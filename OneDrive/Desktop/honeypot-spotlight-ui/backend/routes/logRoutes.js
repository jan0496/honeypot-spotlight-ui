import express from "express";
import { addLog, getLogs } from "../controllers/logController.js";

const router = express.Router();

router.get("/", getLogs);
router.post("/", addLog);

export default router;
