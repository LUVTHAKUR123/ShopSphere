import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../config/db";

export class Wishlist extends Model<
  InferAttributes<Wishlist>,
  InferCreationAttributes<Wishlist>
> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare product_id: number;
  declare created_at: CreationOptional<Date>;
}

Wishlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "wishlists",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "product_id"],
      },
    ],
  },
);
