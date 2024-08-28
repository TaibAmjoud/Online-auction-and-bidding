import express from "express";
import { createBiding, getBid } from "../controllers/biding.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createBiding);
router.get("/get", getBid);

export default router;
