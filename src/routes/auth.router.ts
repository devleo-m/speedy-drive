import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;