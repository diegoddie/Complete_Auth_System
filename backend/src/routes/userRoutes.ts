import express from "express";
import { VerifyAuth, VerifyAdmin } from "../middlewares/middleware";
import { getAdminDashboard, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.get("/profile", VerifyAuth, getUserProfile);
router.get("/admin/dashboard", VerifyAuth, VerifyAdmin, getAdminDashboard);

export default router;
