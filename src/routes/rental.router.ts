import { Router } from "express";
import { RentalController } from "../controller/rental.controller";
const router = Router();

router.post("/rentals", RentalController.createRental);
router.get("/rentals", RentalController.listAllRentals);
router.get("/rentals/:id", RentalController.listRentalById);
router.put("/rentals/:id", RentalController.updateRental);
router.delete("/rentals/:id", RentalController.deleteRental);

export default router;