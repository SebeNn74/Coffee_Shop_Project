import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

const userController = new UserController();

router.get("/", authMiddleware ,userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.post("/validate", userController.validate);
router.post("/login", userController.login)
router.delete("/:id", userController.delete);

export default router;
