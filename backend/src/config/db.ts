// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  },
);

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    throw error;
  }
};
