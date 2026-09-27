import { User } from "./User";
import { Product } from "./Product";
import { CartItem } from "./CartItem";
import { Category } from "./category";
import { Wishlist } from "./Wishlist";
// User -> CartItem
User.hasMany(CartItem, {
  foreignKey: "user_id",
  as: "cartItems",
  onDelete: "CASCADE",
});

CartItem.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Product -> CartItem
Product.hasMany(CartItem, {
  foreignKey: "product_id",
  as: "cartItems",
});

CartItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

// Category -> Product
Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
  onDelete: "SET NULL",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

// Wishlist associations
User.hasMany(Wishlist, {
  foreignKey: "user_id",
  as: "wishlists",
  onDelete: "CASCADE",
});

Wishlist.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Product.hasMany(Wishlist, {
  foreignKey: "product_id",
  as: "wishlists",
  onDelete: "CASCADE",
});

Wishlist.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

export { User, Product, CartItem, Category, Wishlist };
