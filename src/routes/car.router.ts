import { Router } from "express";
import { CarController } from "../controller/car.controller";
const router = Router();

router.post("/cars", CarController.createCar);
router.get("/cars", CarController.findAllCars);
router.get("/cars/:id", CarController.findByIdCar);
router.put("/cars/:id", CarController.updateCar);
router.delete("/cars/:id", CarController.deleteCar);

export default router;