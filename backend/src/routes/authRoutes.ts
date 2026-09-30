import { Router } from "express";

import {
  signup,
  signin,
  getProfile,
  logout,
} from "../controllers/authController";

import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/profile", requireAuth, getProfile);

router.post("/logout", logout);

export default router;
