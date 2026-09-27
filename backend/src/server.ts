import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";

import { connectDB, sequelize } from "./config/db";

// Load models and associations
import "./models";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Health check
app.get("/", (_req, res) => {
  res.json({
    message: "ShopSphere API is running",
  });
});

const PORT = Number(process.env.PORT) || 8001;

const startServer = async () => {
  try {
    await connectDB();

    // Create tables from registered Sequelize models
    await sequelize.sync();

    console.log("Database tables synchronized successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
