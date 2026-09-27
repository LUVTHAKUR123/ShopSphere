  import { Router } from "express";
  import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  } from "../controllers/productController";
  import { requireAuth, requireAdmin } from "../middleware/auth";
  import { upload } from "../middleware/upload";

  const router = Router();

  router.get("/", getAllProducts);
  router.get("/:id", getProductById);

  // Admin-only routes
  router.post(
    "/",
    requireAuth,
    requireAdmin,
    upload.single("image"),
    createProduct,
  );
  // router.put("/:id", requireAuth, requireAdmin, updateProduct);
  router.put(
    "/:id",
    requireAuth,
    requireAdmin,
    upload.single("image"),
    updateProduct,
  );

  router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

  export default router;
