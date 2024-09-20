import { Router } from "express";
import { UserController } from "../controller/user.controller";
const router = Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.findAllUsers);
router.get("/users/:id", UserController.findUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;