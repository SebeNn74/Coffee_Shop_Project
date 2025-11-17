import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

const userController = new UserController();

// ENDPOINT HEALTH
router.get("/health", (req, res) => {
    res.json({ status: "ok", instance: process.env.HOSTNAME });
});

router.get("/", authMiddleware, userController.getAll);
router.get("/:id",authMiddleware, userController.getById);
router.post("/", userController.create);
router.post("/validate", userController.validate);
router.post("/login", userController.login)
router.delete("/:id", authMiddleware, userController.delete);

export default router;
