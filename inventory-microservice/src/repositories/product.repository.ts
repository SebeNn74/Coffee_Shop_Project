import { Product } from "../models/product.model";
import { ProductCreationAttrs, ProductUpdateAttrs } from "../models/dtos/product.dto";

export const ProductRepository = {
  findAll: () => Product.findAll(),
  
  findById: (id: number) => Product.findByPk(id),
  
  create: (data: ProductCreationAttrs) => Product.create(data),
  
  update: async (id: number, data: ProductUpdateAttrs) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return product.update(data);
  },
  
  delete: (id: number) => Product.destroy({ where: { id } }),
};