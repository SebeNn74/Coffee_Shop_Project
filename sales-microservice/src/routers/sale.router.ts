import { Router } from "express";
import { SaleController } from "@/controllers/sale.controller"

const router = Router()
const saleController = new SaleController()

// ENDPOINT HEALTH
router.get("/health", (req, res) => {
    res.json({ status: "ok", instance: process.env.HOSTNAME });
});

router.get("/", saleController.getAll)
router.get("/:id", saleController.getById)
router.post("/", saleController.create)
router.patch("/:id", saleController.update)
router.delete("/:id", saleController.delete)

export default router;
