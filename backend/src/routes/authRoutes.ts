import { Router } from "express";

import { signup, signin, getProfile } from "../controllers/authController";

import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/profile", requireAuth, getProfile);

export default router;
