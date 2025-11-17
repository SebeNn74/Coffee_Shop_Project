import { Router } from "express";
import { SaleController } from "@/controllers/sale.controller"

const router = Router()
const saleController = new SaleController()

router.get("/", saleController.getAll)
router.get("/:id", saleController.getById)
router.post("/", saleController.create)
router.patch("/:id", saleController.update)
router.delete("/:id", saleController.delete)

export default router;
