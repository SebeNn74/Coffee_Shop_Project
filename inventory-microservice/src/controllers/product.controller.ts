import { Request, Response } from "express";
import { ProductService } from "@/services/product.service";

export class ProductController {
   private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    getAll = async (_req: Request, res: Response) => {
        const products = await this.productService.getAll();
        res.json(products);
    }

    getById = async (req: Request, res: Response) => {
        const product = await this.productService.getById(Number(req.params.id));
        if (!product) return res.status(404).json({ message: "Not found" });
        res.json(product);
    }

    create = async (req: Request, res: Response) => {
        const newProduct = await this.productService.create(req.body);
        res.status(201).json(newProduct);
    }

    update = async (req: Request, res: Response) => {
        const updated = await this.productService.update(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.json(updated);
    }

    delete = async (req: Request, res: Response) => {
        await this.productService.delete(Number(req.params.id));
        res.status(204).send();
    }

};
