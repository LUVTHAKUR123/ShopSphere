// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { pool } from "../config/db";

// export async function signup(req: Request, res: Response) {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   try {
//     const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
//     if (existing.rows.length > 0) {
//       return res.status(409).json({ message: "Email already registered" });
//     }
//     const hash = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, is_admin",
//       [name, email, hash]
//     );
//     const user = result.rows[0];
//     const token = jwt.sign(
//       { id: user.id, isAdmin: user.is_admin },
//       process.env.JWT_SECRET || "secret",
//       { expiresIn: "7d" }
//     );
//     res.status(201).json({ token, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// }

// export async function signin(req: Request, res: Response) {
//   const { email, password } = req.body;
//   try {
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const user = result.rows[0];
//     const match = await bcrypt.compare(password, user.password_hash);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign(
//       { id: user.id, isAdmin: user.is_admin },
//       process.env.JWT_SECRET || "secret",
//       { expiresIn: "7d" }
//     );
//     res.json({
//       token,
//       user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// }

// export async function getProfile(req: any, res: Response) {
//   try {
//     const result = await pool.query(
//       "SELECT id, name, email, is_admin, created_at FROM users WHERE id = $1",
//       [req.user.id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// }

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models";

const generateToken = (user: User): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.is_admin,
    },
    secret,
    {
      expiresIn: "7d",
    },
  );
};

// SIGNUP
export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    // Check existing user
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password_hash: passwordHash,
      is_admin: false,
      created_at: new Date(),
    });

    // Generate JWT
    const token = generateToken(user);

    return res.status(201).json({
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

// SIGNIN
export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    // Find user
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = generateToken(user);

    return res.status(200).json({
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

// GET PROFILE
export async function getProfile(req: Request, res: Response) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "is_admin", "created_at"],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
