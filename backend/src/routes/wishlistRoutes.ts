import { Router } from "express";
import {
  addToWishlist,
  getWishlist,
  checkWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController";

import { requireAuth  } from "../middleware/auth";

const router = Router();

// All wishlist routes require login
router.use(requireAuth );

router.post("/", addToWishlist);
router.get("/", getWishlist);
router.get("/check/:productId", checkWishlist);
router.delete("/:productId", removeFromWishlist);
router.delete("/", clearWishlist);

export default router;
