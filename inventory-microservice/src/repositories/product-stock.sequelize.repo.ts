import { ProductStock } from "../models/product-stock.model";
import { ProductStockEntity } from "./entities/product-stock.entity";
import { CreateProductStockDTO } from "@/models/dtos/product-stock.dto"; 

export const ProductStockRepository = {
  create: (data: CreateProductStockDTO) => ProductStockEntity.create(data),

  updateQuantity: (product_id: number, quantity: number) =>
    ProductStockEntity.update({ quantity }, { where: { product_id } }),

  deleteByProductId: (product_id: number) =>
    ProductStockEntity.destroy({ where: { product_id } }),
};