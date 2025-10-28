// src/controllers/customer.controller.ts

import { Request, Response } from "express";
import { CustomerService } from "@/services/customer.service";

export class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const created = await this.customerService.create(req.body);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      res.json(await this.customerService.getAll());
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      res.json(await this.customerService.getById(id));
    } catch (e: any) {
      res.status(404).json({ error: e.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = await this.customerService.update(id, req.body);
      res.json(updated);
    } catch (e: any) {
      const status = e.status || 400;
      res.status(status).json({ error: e.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.customerService.delete(id);
      res.status(204).send();
    } catch (e: any) {
      res.status(404).json({ error: e.message });
    }
  };
}