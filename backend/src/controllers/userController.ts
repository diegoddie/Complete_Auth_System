import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/middleware";
import User from "../models/User";

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...userData } = user.toObject();

        res.status(200).json({ user: userData });
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};

export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const users = await User.find({}).select('-password');

    res.status(200).json({
      totalUsers,
      users
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching admin dashboard", error: error.message });
  }
};



