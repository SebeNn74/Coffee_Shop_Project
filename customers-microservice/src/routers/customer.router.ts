import { Router } from "express";
import { CustomerController } from "@/controllers/customer.controller";

const router = Router();
const customerController = new CustomerController();

// ENDPOINT HEALTH
router.get("/health", (req, res) => {
    res.json({ status: "ok", instance: process.env.HOSTNAME });
});

router.get("/", customerController.getAll);
router.get("/:id", customerController.getById);
router.post("/", customerController.create);
router.put("/:id", customerController.update);
router.delete("/:id", customerController.delete);

export default router;