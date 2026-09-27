import { Request, Response } from "express";

import { CartItem, Product } from "../models";

// GET CART
export async function getCart(req: Request, res: Response) {
  try {
    const cartItems = await CartItem.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            "price",
            "image_data",
            "image_mime_type",
            "image_url",
          ],
        },
      ],
      order: [["id", "ASC"]],
    });

    // Convert image Buffer to Base64
    const formattedCart = cartItems.map((item) => {
      const data = item.toJSON() as {
        product?: {
          image_data?: Buffer | { type: "Buffer"; data: number[] };
          [key: string]: unknown;
        };
        [key: string]: unknown;
      };

      if (data.product?.image_data) {
        const imageData = data.product.image_data as any;

        if (Buffer.isBuffer(imageData)) {
          (data.product as { image_data?: unknown }).image_data =
            imageData.toString("base64");
        } else if (
          imageData.type === "Buffer" &&
          Array.isArray(imageData.data)
        ) {
          (data.product as { image_data?: unknown }).image_data = Buffer.from(
            imageData.data,
          ).toString("base64");
        }
      }

      return data;
    });

    return res.status(200).json(formattedCart);
  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
// ADD TO CART
export async function addToCart(req: Request, res: Response) {
  const { product_id, quantity } = req.body;

  try {
    if (!product_id) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const addQuantity = Number(quantity) || 1;

    if (addQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // Check product exists
    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check existing cart item
    const existingItem = await CartItem.findOne({
      where: {
        user_id: req.user.id,
        product_id,
      },
    });

    if (existingItem) {
      existingItem.quantity += addQuantity;

      await existingItem.save();

      return res.status(200).json(existingItem);
    }

    // Create new cart item
    const cartItem = await CartItem.create({
      user_id: req.user.id,
      product_id,
      quantity: addQuantity,
    });

    return res.status(201).json(cartItem);
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

// UPDATE CART ITEM
export async function updateCartItem(req: Request, res: Response) {
  const { quantity } = req.body;

  try {
    const newQuantity = Number(quantity);

    if (!newQuantity || newQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cartItem = await CartItem.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.quantity = newQuantity;

    await cartItem.save();

    return res.status(200).json(cartItem);
  } catch (error) {
    console.error("Update cart error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

// REMOVE FROM CART
export async function removeFromCart(req: Request, res: Response) {
  try {
    const cartItem = await CartItem.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await cartItem.destroy();

    return res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error("Remove cart item error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
