import { Router } from "express";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

import { requireAuth, requireAdmin } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin-only routes
router.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  createCategory,
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  updateCategory,
);

router.delete("/:id", requireAuth, requireAdmin, deleteCategory);

export default router;
