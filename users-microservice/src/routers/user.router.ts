import { Router } from "express";
import { UserController } from "@/controllers/user.controller";

const router = Router();

const userController = new UserController();

// ENDPOINT HEALTH
router.get("/health", (req, res) => {
    res.json({ status: "ok", instance: process.env.HOSTNAME });
});

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.post("/validate", userController.validate);
router.post("/login", userController.login)
router.delete("/:id", userController.delete);

export default router;
