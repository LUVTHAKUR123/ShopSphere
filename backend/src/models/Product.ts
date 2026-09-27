import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../config/db";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  // Existing fields
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string | null;
  declare price: number;
  declare image_data: Buffer | null;
  declare stock: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;
  declare image_mime_type: string | null;

  // New fields
  declare category_id: number | null;
  declare brand: string | null;
  declare discountPercentage: CreationOptional<number>;
  declare rating: CreationOptional<number>;
  declare sku: string | null;
  declare tags: CreationOptional<string[]>;
  declare thumbnail: string | null;
  declare images: CreationOptional<string[]>;
}

Product.init(
  {
    // Existing fields
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    image_data: {
      type: DataTypes.BLOB,
      allowNull: true,
    },

    image_mime_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    // New fields
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },

    brand: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    discountPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    },

    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0,
    },

    sku: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },

    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },

    thumbnail: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  },
);
