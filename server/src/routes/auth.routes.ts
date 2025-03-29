import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", AuthController.outhLogin);

export default router;
