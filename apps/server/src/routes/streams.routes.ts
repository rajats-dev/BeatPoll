import { Router } from "express";
import StreamController from "../controllers/streams.controller.js";

const router = Router();

router.post("/creaStream", StreamController.createStream);

export default router;
