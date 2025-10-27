import { ProductStock } from "../models/productStock.model";

export const ProductStockRepository = {
  create: (data: any) => ProductStock.create(data),

  updateQuantity: (product_id: number, quantity: number) =>
    ProductStock.update({ quantity }, { where: { product_id } }),

  deleteByProductId: (product_id: number) =>
    ProductStock.destroy({ where: { product_id } }),
};
