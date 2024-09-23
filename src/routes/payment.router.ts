import { Router } from "express";
import { PaymentController } from "../controller/payment.controller";
import authMiddleware from "../middleware/auth.middleware";
import isAdmin from "../middleware/isAdmin.middleware";
const router = Router();

router.post("/payments", authMiddleware, isAdmin, PaymentController.createPayment);
router.get("/payments", authMiddleware, isAdmin, PaymentController.listAllPayments);
router.get("/payments/:id", authMiddleware, isAdmin, PaymentController.listPaymentById);
router.put("/payments/:id", authMiddleware, isAdmin, PaymentController.updatePayment);
router.delete("/payments/:id", authMiddleware, isAdmin, PaymentController.deletePayment);

export default router;