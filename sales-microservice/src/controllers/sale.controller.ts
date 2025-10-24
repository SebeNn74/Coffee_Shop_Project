import { Request, Response } from "express";
import { SaleService } from "@/services/sale.service"

export class SaleController {
    private saleService: SaleService;

    constructor() {
        this.saleService = new SaleService();
    }

    private validateError(error: unknown, res: Response) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }

    getAll = async (res: Response) => {
        try {
            res.json(await this.saleService.getAll());
        } catch (error: unknown) {
            this.validateError(error, res)
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const saleId = Number(req.params.id);
            res.json(await this.saleService.getById(saleId))
        } catch (error: unknown) {
            this.validateError(error, res)
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const created = await this.saleService.create(req.body);
            res.status(201).json(created);
        } catch (error: unknown) {
            this.validateError(error, res)
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const saleId = Number(req.params.id);
            const updated = await this.saleService.update(saleId, req.body)
            res.status(200).json(updated);
        } catch (error: unknown) {
            this.validateError(error, res)
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const saleId = Number(req.params.id);
            await this.saleService.delete(saleId);
            res.status(204).send();
        } catch (error: unknown) {
            this.validateError(error, res)
        }
    }

}