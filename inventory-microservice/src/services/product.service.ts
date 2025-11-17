// services/product.service.ts
import { ProductRepository } from "@/repositories/product.sequelize.repo";
import { ProductStockRepository } from "@/repositories/product-stock.sequelize.repo";
import { Product } from "@/models/product.model";
import { ProductStock } from "@/models/product-stock.model";
import { CreateProductInput, UpdateProductInput } from "@/models/dtos/product.dto";
import { NotFoundError } from "@/exceptions/domain.error";

export class ProductService {
  private productRepo: ProductRepository;
  private productStockRepo: ProductStockRepository;

  constructor() {
    this.productRepo = new ProductRepository;
    this.productStockRepo = new ProductStockRepository;
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepo.getAll();
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productRepo.getById(id);
    if (!product)
      throw new NotFoundError(`Producto con id ${id} no encontrado`)
    return product;
  }

  async create(data: CreateProductInput): Promise<Product> {
    const { quantity, ...productData } = data;
    const product = await this.productRepo.create(productData);
    await this.productStockRepo.create({
      product_id: product.id,
      quantity: quantity || 0,
    });
    return product;
  }

  async update(id: number, data: UpdateProductInput): Promise<Product | null> {
    return await this.productRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const product = await this.productRepo.getById(id);
    if (!product) throw new Error("Product not found");
    await this.productStockRepo.deleteByProductId(id);
    const deletedCount = await this.productRepo.delete(id);
    if (deletedCount) throw new Error("No rows deleted");
  }

  async updateStock(product_id: number, quantity: number): Promise<ProductStock | null> {
    return await this.productStockRepo.updateQuantity(product_id, quantity)
  }

};