import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const ProductController = {
  getAll: async (_req: Request, res: Response) => {
    const products = await ProductService.getAll();
    res.json(products);
  },

  getById: async (req: Request, res: Response) => {
    const product = await ProductService.getById(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  },

  create: async (req: Request, res: Response) => {
    const newProduct = await ProductService.create(req.body);
    res.status(201).json(newProduct);
  },

  update: async (req: Request, res: Response) => {
    const updated = await ProductService.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  },

  delete: async (req: Request, res: Response) => {
    await ProductService.delete(Number(req.params.id));
    res.status(204).send();
  },
};
