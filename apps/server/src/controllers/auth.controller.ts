import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
import { Provider } from "@prisma/client";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: Provider;
  profilePic: string;
}

class AuthController {
  static async outhLogin(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;

      let findUser = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }

      let JWTPayload = {
        id: findUser.id,
        name: body.name,
        email: body.email,
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      let filteObj = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        provider: findUser.provider,
        profilePic: findUser.profilePic,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      };

      res.status(200).json({
        message: "Logged in successfully!",
        user: { ...filteObj, token: `Bearer ${token}` },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default AuthController;
