import { Request, Response } from "express";
import { Category } from "../models/category";
// GET /api/categories
export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await Category.findAll({
      order: [["id", "ASC"]],
    });

    return res.json(
      categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
      })),
    );
  } catch (error) {
    console.error("Get categories error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

// GET /api/categories/:id
export async function getCategoryById(req: Request, res: Response) {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.json(category);
  } catch (error) {
    console.error("Get category error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

// POST /api/categories
export async function createCategory(req: Request, res: Response) {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Name and slug are required",
      });
    }

    const category = await Category.create({
      name: String(name).trim(),
      slug: String(slug).trim().toLowerCase(),
    });

    return res.status(201).json(category);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Category slug already exists",
      });
    }

    console.error("Create category error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

// PUT /api/categories/:id
export async function updateCategory(req: Request, res: Response) {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const { name, slug } = req.body;

    await category.update({
      ...(name !== undefined && { name: String(name).trim() }),
      ...(slug !== undefined && {
        slug: String(slug).trim().toLowerCase(),
      }),
    });

    return res.json(category);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Category slug already exists",
      });
    }

    console.error("Update category error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

// DELETE /api/categories/:id
export async function deleteCategory(req: Request, res: Response) {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await category.destroy();

    return res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
