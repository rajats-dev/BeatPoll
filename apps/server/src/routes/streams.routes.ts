import { Router } from "express";
import StreamController from "../controllers/streams.controller.js";

const router = Router();

router.post("/createStream", StreamController.createStream);

export default router;
