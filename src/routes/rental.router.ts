import { Router } from "express";
import { RentalController } from "../controller/rental.controller";
import authMiddleware from "../middleware/auth.middleware";
import isAdmin from "../middleware/isAdmin.middleware";
const router = Router();

router.post("/rentals", authMiddleware, isAdmin, RentalController.createRental);
router.get("/rentals", authMiddleware, isAdmin, RentalController.listAllRentals);
router.get("/rentals/:id", authMiddleware, isAdmin, RentalController.listRentalById);
router.put("/rentals/:id", authMiddleware, isAdmin, RentalController.updateRental);
router.delete("/rentals/:id", authMiddleware, isAdmin, RentalController.deleteRental);

export default router;