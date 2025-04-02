import { Router } from "express";
import StreamController from "../controllers/streams.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/next", protectRoute, StreamController.nextStream);
router.post("/createStream", StreamController.createStream);

export default router;
