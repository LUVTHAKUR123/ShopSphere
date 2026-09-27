import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../config/db";

export class CartItem extends Model<
  InferAttributes<CartItem>,
  InferCreationAttributes<CartItem>
> {
  declare id: CreationOptional<number>;

  declare user_id: number;

  declare product_id: number;

  declare quantity: CreationOptional<number>;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,

      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    tableName: "cart_items",
    timestamps: false,

    indexes: [
      {
        unique: true,
        fields: ["user_id", "product_id"],
      },
    ],
  },
);
