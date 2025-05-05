import { Request, Response, NextFunction } from "express";
import { JwtPayload, verifyAccessToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const VerifyAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  if (accessToken.startsWith("Bearer ")) {
    accessToken = accessToken.slice(7);
  }

  try {
    const payload = verifyAccessToken(accessToken);
    req.user = payload;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: "Invalid access token", error: error.message });
  }
};

export const VerifyAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: admin access only" });
  }

  next();
};
