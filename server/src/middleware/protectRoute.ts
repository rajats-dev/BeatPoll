import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized - No Auth Header" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token:", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: AuthUser) => {
    if (err) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    req.user = user as AuthUser;
    console.log("Last return");
    next();
  });
};

export default protectRoute;
