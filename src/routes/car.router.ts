import { Router } from "express";
import { CarController } from "../controller/car.controller";
import authMiddleware from "../middleware/auth.middleware";
import isAdmin from "../middleware/isAdmin.middleware";

const router = Router();

router.post("/cars", authMiddleware, isAdmin, CarController.createCar);
router.get("/cars", authMiddleware, isAdmin, CarController.findAllCars);
router.get("/cars/:id", authMiddleware, isAdmin, CarController.findByIdCar);
router.put("/cars/:id", authMiddleware, isAdmin, CarController.updateCar);
router.delete("/cars/:id", authMiddleware, isAdmin, CarController.deleteCar);

export default router;