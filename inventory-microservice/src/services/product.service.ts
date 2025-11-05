// services/product.service.ts
import { ProductRepository } from "../repositories/product.sequelize.repo";
import { ProductStockRepository } from "../repositories/product-stock.sequelize.repo";
import { Product } from "../models/product.model";
import { CreateProductInput, UpdateProductInput } from "../models/dtos/product.dto";

export const ProductService = {
  getAll: () => ProductRepository.findAll(),

  getById: (id: number) => ProductRepository.findById(id),

  create: async (data: CreateProductInput) => {
    const { quantity, ...productData } = data;
    const product = await ProductRepository.create(productData);
    await ProductStockRepository.create({
      product_id: product.id,
      quantity: quantity || 0,
    });
    return product;
  },

  update: (id: number, data: UpdateProductInput) => 
    ProductRepository.update(id, data),

  delete: async (id: number) => {
    const product = await ProductRepository.findById(id);
    if (!product) throw new Error("Product not found");
    await ProductStockRepository.deleteByProductId(id);
    const deletedCount = await ProductRepository.delete(id);
    if (deletedCount === 0) throw new Error("No rows deleted");
    return deletedCount;
  },

  updateStock: (product_id: number, quantity: number) =>
    ProductStockRepository.updateQuantity(product_id, quantity),
};