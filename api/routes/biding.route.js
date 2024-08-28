import express from "express";
import { createBiding } from "../controllers/biding.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createBiding);

export default router;
