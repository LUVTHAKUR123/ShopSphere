import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models";

const generateToken = (user: User, expiresIn: string = "7d"): string => {
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
      expiresIn,
    } as jwt.SignOptions,
  );
};

const isProd = process.env.NODE_ENV === "production";
const cookieBase = {
  httpOnly: true,
  secure: isProd,
  sameSite: (isProd ? "none" : "lax") as "none" | "lax",
  path: "/",
};

function setAuthCookie(res: Response, token: string, remember: boolean) {
  res.cookie("token", token, {
    ...cookieBase,
    // remember = persistent cookie, warna session cookie (browser band = logout)
    ...(remember ? { maxAge: 30 * 24 * 60 * 60 * 1000 } : {}),
  });
}
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
    const token = generateToken(user, "7d");
    setAuthCookie(res, token, true);

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
  const { email, password, remember } = req.body;

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

    const rememberMe = Boolean(remember);

    // Generate JWT
    const token = generateToken(user, rememberMe ? "30d" : "7d");
    setAuthCookie(res, token, remember);
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

export async function logout(_req: Request, res: Response) {
  res.clearCookie("token", cookieBase);
  return res.status(200).json({ message: "Logged out" });
}
