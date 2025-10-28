import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

const userController = new UserController();

router.get("/getAll", authMiddleware ,userController.getAll);
router.get("/getById/:id", userController.getById);
router.post("/createUser", userController.create);
router.post("/validateUser", userController.validate);
router.post("/login", userController.login)
router.delete("/deleteUser/:id", userController.delete);

export default router;
