import { ProductStock } from "../models/product-stock.model";
import { ProductStockEntity } from "./entities/product-stock.entity";
import { CreateProductStockDTO } from "@/models/dtos/product-stock.dto"; 

export class ProductStockRepository {
  async create(productStock: CreateProductStockDTO): Promise<ProductStock> {
    const stock = await ProductStockEntity.create(productStock);
    return stock.toJSON() as ProductStock;
  }

  async updateQuantity(product_id: number, quantity: number): Promise<ProductStock | null> {
    await ProductStockEntity.update({ quantity }, { where: { product_id } });
    const updated = await ProductStockEntity.findByPk(product_id);
    return updated ? (updated.toJSON() as ProductStock) : null;
  }

  async deleteByProductId(product_id: number): Promise<boolean> {
    const deleted = await ProductStockEntity.destroy({ where: { product_id } });
    return deleted > 0;
  }
}