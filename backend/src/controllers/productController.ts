import { Request, Response } from "express";
import { Product } from "../models";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { category_id } = req.query;

    const products = await Product.findAll({
      where: category_id ? { category_id: Number(category_id) } : {},
      order: [["id", "ASC"]],
    });

    const result = products.map((product) => {
      const data = product.toJSON();

      return {
        ...data,
        image_data: data.image_data
          ? Buffer.from(data.image_data).toString("base64")
          : null,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("Get all products error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const data = product.toJSON();

    res.json({
      ...data,
      image_data: data.image_data
        ? Buffer.from(data.image_data).toString("base64")
        : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

// Admin only
export async function createProduct(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      price,
      image_url,
      stock,
      category_id,
      brand,
      discountPercentage,
      rating,
      sku,
      tags,
      thumbnail,
      images,
    } = req.body;

    const product = await Product.create({
      // Existing fields
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      stock: Number(req.body.stock ?? 0),
      image_data: req.file?.buffer ?? null,
      image_mime_type: req.file?.mimetype ?? null,

      // New fields
      category_id: category_id ? Number(category_id) : null,
      brand: brand ?? null,
      discountPercentage: Number(discountPercentage ?? 0),
      rating: Number(rating ?? 0),
      sku: sku ?? null,
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string"
          ? tags
              .split(",")
              .map((tag: string) => tag.trim())
              .filter(Boolean)
          : [],
      thumbnail: thumbnail ?? null,
      images: Array.isArray(images) ? images : [],
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.update({
      // Existing fields
      name: req.body.name ?? product.name,
      description: req.body.description ?? product.description,
      price:
        req.body.price !== undefined ? Number(req.body.price) : product.price,
      stock:
        req.body.stock !== undefined ? Number(req.body.stock) : product.stock,

      // New fields
      category_id:
        req.body.category_id !== undefined
          ? req.body.category_id === null || req.body.category_id === ""
            ? null
            : Number(req.body.category_id)
          : product.category_id,

      brand: req.body.brand ?? product.brand,

      discountPercentage:
        req.body.discountPercentage !== undefined
          ? Number(req.body.discountPercentage)
          : product.discountPercentage,

      rating:
        req.body.rating !== undefined
          ? Number(req.body.rating)
          : product.rating,

      sku: req.body.sku ?? product.sku,

      tags:
        req.body.tags !== undefined
          ? Array.isArray(req.body.tags)
            ? req.body.tags
            : typeof req.body.tags === "string"
              ? req.body.tags
                  .split(",")
                  .map((tag: string) => tag.trim())
                  .filter(Boolean)
              : []
          : product.tags,

      thumbnail: req.body.thumbnail ?? product.thumbnail,

      images:
        req.body.images !== undefined
          ? Array.isArray(req.body.images)
            ? req.body.images
            : []
          : product.images,

      // Update image only if a new file is uploaded
      ...(req.file
        ? {
            image_data: req.file.buffer,
            image_mime_type: req.file.mimetype,
          }
        : {}),
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.destroy();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}
