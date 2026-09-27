import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../config/db";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare email: string;

  declare password_hash: string;

  declare is_admin: CreationOptional<boolean>;

  declare created_at: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,

      validate: {
        isEmail: true,
      },
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },

  {
    sequelize,

    tableName: "users",

    timestamps: false,
  },
);
