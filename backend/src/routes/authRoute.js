import express from "express";

import { adminLogin, validate } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/validate", requireAuth, validate);

export default router;
