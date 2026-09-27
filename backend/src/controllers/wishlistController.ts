import { Request, Response } from "express";
import { Wishlist, Product } from "../models";

// Add product to wishlist
export async function addToWishlist(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const productId = Number(req.body.product_id);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({ message: "Valid product_id is required" });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existing = await Wishlist.findOne({
      where: { user_id: userId, product_id: productId },
    });

    if (existing) {
      return res.status(409).json({
        message: "Product already exists in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user_id: userId,
      product_id: productId,
    });

    return res.status(201).json({
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Add wishlist error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Get logged-in user's wishlist
export async function getWishlist(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const wishlist = await Wishlist.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
      order: [["created_at", "DESC"]],
    });

    const formattedWishlist = wishlist.map((item) => {
      const data = item.toJSON() as any;

      if (data.product?.image_data) {
        const imageData = data.product.image_data as any;

        if (Buffer.isBuffer(imageData)) {
          data.product.image_data = imageData.toString("base64");
        } else if (
          imageData.type === "Buffer" &&
          Array.isArray(imageData.data)
        ) {
          data.product.image_data = Buffer.from(imageData.data).toString(
            "base64",
          );
        }
      }

      return data;
    });

    return res.json(formattedWishlist);
  } catch (error) {
    console.error("Get wishlist error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
// Check if product exists in wishlist
export async function checkWishlist(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const productId = Number(req.params.productId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const item = await Wishlist.findOne({
      where: { user_id: userId, product_id: productId },
    });

    return res.json({
      product_id: productId,
      in_wishlist: Boolean(item),
    });
  } catch (error) {
    console.error("Check wishlist error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Remove one product from wishlist
export async function removeFromWishlist(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const productId = Number(req.params.productId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const deleted = await Wishlist.destroy({
      where: { user_id: userId, product_id: productId },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found in wishlist",
      });
    }

    return res.json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Remove wishlist error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Clear all wishlist items for logged-in user
export async function clearWishlist(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Wishlist.destroy({
      where: { user_id: userId },
    });

    return res.json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    console.error("Clear wishlist error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
