import { Router } from "express";
import { CarController } from "../controller/car.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.get("/available", authMiddleware, CarController.listAvailableCars);

export default router;