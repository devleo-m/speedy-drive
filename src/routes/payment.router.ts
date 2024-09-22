import { Router } from "express";
import { PaymentController } from "../controller/payment.controller";
const router = Router();

router.post("/payments", PaymentController.createPayment);
router.get("/payments", PaymentController.listAllPayments);
router.get("/payments/:id", PaymentController.listPaymentById);
router.put("/payments/:id", PaymentController.updatePayment);
router.delete("/payments/:id", PaymentController.deletePayment);

export default router;