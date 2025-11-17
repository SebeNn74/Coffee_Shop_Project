import { Product } from "../models/product.model";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDTO, UpdateProductDTO } from "@/models/dtos/product.dto";
import { ProductStockEntity } from "./entities/product-stock.entity";

export class ProductRepository {

  async getAll(): Promise<Product[]> {
    const products = await ProductEntity.findAll({
      include: [
        {
          model: ProductStockEntity,
          as: "product_stock",
          attributes: [
            "id",
            "product_id",
            "quantity",
            "reserved",
          ],
        },
      ],
    });
    return products.map((p) => p.toJSON() as Product);
  }

  async getById(id: number): Promise<Product | null> {
    const product = await ProductEntity.findByPk(id);
    return product ? (product.toJSON() as Product) : null;
  }

  async create(product: CreateProductDTO): Promise<Product> {
    const created = await ProductEntity.create(product);
    return created.toJSON() as Product;
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product | null> {
    await ProductEntity.update(data, { where: { id } });
    const updated = await ProductEntity.findByPk(id);
    return updated ? (updated.toJSON() as Product) : null;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await ProductEntity.destroy({ where: { id } });
    return deleted > 0;
  }
};
