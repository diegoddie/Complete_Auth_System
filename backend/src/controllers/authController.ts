import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import RefreshToken from "../models/RefreshToken";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email";

const REFRESH_TOKEN_EXPIRES_IN =
  Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 604800;

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } =
      req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(422).json({ message: "All fields are required" });
    }

    if (firstName.length < 3) {
      return res
        .status(422)
        .json({ message: "First name must be at least 3 characters long" });
    }

    if (lastName.length < 3) {
      return res
        .status(422)
        .json({ message: "Last name must be at least 3 characters long" });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const { password: _, ...userResponse } = newUser.toObject();

    res.status(201).json({ message: "User created successfully", user: userResponse });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await RefreshToken.updateMany(
      { userId: user._id.toString(), isValid: true },
      { isValid: false }
    );

    await RefreshToken.create({
      userId: user._id.toString(),
      token: refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
    });

    const { password: _, ...userResponse } = user.toObject();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: REFRESH_TOKEN_EXPIRES_IN * 1000,
        sameSite: "none",
        path: "/",
      })
      .status(200)
      .json({
        message: "Login successful",
        user: userResponse,
        accessToken,
      });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const storedRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!storedRefreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    } else {
      await RefreshToken.deleteOne({ token: refreshToken });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    const existingToken = await RefreshToken.findOne({ token: refreshToken, isValid: true });

    if (!existingToken) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
      });
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
      });
      return res.status(403).json({ message: "User not found" });
    }

    const newPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const newAccessToken = generateAccessToken(newPayload);

    const { password: _, ...userResponse } = user.toObject();

    res
      .status(200)
      .json({ 
        accessToken: newAccessToken,
        user: userResponse,
      });
  } catch (error: any) {
    console.error(error);
    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
      })
      .status(403)
      .json({
        message: "Could not refresh access token",
        error: error.message,
      });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({ message: "If the email is registered, you will receive a link to reset." });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET || '', { expiresIn: '1h' });

      await sendEmail(user.email, token);

      res.status(200).json({ message: "Reset password email sent", token });

  } catch (error: any) {
      console.error("Forgot Password error:", error);
      res.status(500).json({ message: "Error during password reset request.", error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
      const { password, confirmPassword } = req.body;
      const token = req.params.token;

      if (!token || !password || !confirmPassword) {
          return res.status(422).json({ message: "All fields are required" });
      }

      if (password !== confirmPassword) {
          return res.status(422).json({ message: "Passwords do not match" });
      }

      if (password.length < 6) {
          return res.status(422).json({ message: "Password must be at least 6 characters long" });
      }

      const payload = jwt.verify(token, process.env.JWT_RESET_SECRET!) as { userId: string };

      const user = await User.findById(payload.userId);
      if (!user) return res.status(422).json({ message: "User not found" });

      user.password = await bcrypt.hash(password, 10);
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
       console.error("Reset Password error:", error);
       res.status(500).json({ message: "Error during password reset.", error: error.message });
  }
};
