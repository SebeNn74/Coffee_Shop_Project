import { Product } from "../models/product.model";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDTO, UpdateProductDTO } from "@/models/dtos/product.dto";
import { ProductStockEntity } from "./entities/product-stock.entity";

export const ProductRepository = {
  findAll: () =>
    ProductEntity.findAll({
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
    }),

  findById: (id: number) => ProductEntity.findByPk(id),

  create: (product: CreateProductDTO) => ProductEntity.create(product),

  update: async (id: number, data: UpdateProductDTO) => {
    const product = await ProductEntity.findByPk(id);
    if (!product) return null;
    return product.update(data);
  },

  delete: (id: number) => ProductEntity.destroy({ where: { id } }),
};
