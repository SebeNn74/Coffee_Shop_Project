import { ProductStock } from "../models/productStock.model";
import { ProductStockCreationAttrs } from "../models/dtos/product.dto";

export const ProductStockRepository = {
  create: (data: ProductStockCreationAttrs) => ProductStock.create(data),

  updateQuantity: (product_id: number, quantity: number) =>
    ProductStock.update({ quantity }, { where: { product_id } }),

  deleteByProductId: (product_id: number) =>
    ProductStock.destroy({ where: { product_id } }),
};