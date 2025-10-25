import { Router } from "express";
import { SaleController } from "@/controllers/sale.controller"

const saleRouter = Router()
const saleController = new SaleController()

saleRouter.get("/", saleController.getAll)
saleRouter.get("/:id", saleController.getById)
saleRouter.post("/", saleController.create)
saleRouter.patch("/:id", saleController.update)
saleRouter.delete("/:id", saleController.delete)

export default saleRouter;
