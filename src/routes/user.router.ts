import { Router } from "express";
import { UserController } from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import isAdmin from "../middleware/isAdmin.middleware";
const router = Router();

router.post("/users", authMiddleware, isAdmin, UserController.createUser);
router.get("/users", authMiddleware, isAdmin, UserController.findAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, UserController.findUserById);
router.put("/users/:id", authMiddleware, isAdmin, UserController.updateUser);
router.delete("/users/:id", authMiddleware, isAdmin, UserController.deleteUser);

export default router;