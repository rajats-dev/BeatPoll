import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: AuthUser) => {
    if (err) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    req.user = user as AuthUser;
    next();
  });
};

export default protectRoute;
