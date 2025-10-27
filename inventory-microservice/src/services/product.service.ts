import { ProductRepository } from "../repositories/product.repository";
import { ProductStockRepository } from "../repositories/productStock.repository";
import { Product } from "../models/product.model";

export const ProductService = {
  getAll: () => ProductRepository.findAll(),

  getById: (id: number) => ProductRepository.findById(id),

  create: async (data: any) => {
    const product = await ProductRepository.create(data);
    await ProductStockRepository.create({
      product_id: product.id,
      quantity: data.quantity || 0,
    });
    return product;
  },

  update: (id: number, data: any) => ProductRepository.update(id, data),

  delete: async (id: number) => {
  const product = await ProductRepository.findById(id);
  if (!product) throw new Error("Product not found");
  await ProductStockRepository.deleteByProductId(id);
  const deletedCount = await Product.destroy({ where: { id } });
  if (deletedCount === 0) throw new Error("No rows deleted");

  return deletedCount;
},


  updateStock: (product_id: number, quantity: number) =>
    ProductStockRepository.updateQuantity(product_id, quantity),
};
