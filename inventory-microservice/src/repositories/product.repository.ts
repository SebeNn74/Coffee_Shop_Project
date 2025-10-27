import { Product } from "../models/product.model";

export const ProductRepository = {
  findAll: () => Product.findAll(),
  findById: (id: number) => Product.findByPk(id),
  create: (data: any) => Product.create(data),
  update: async (id: number, data: any) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return product.update(data);
  },
  delete: (id: number) => Product.destroy({ where: { id } }),
};
