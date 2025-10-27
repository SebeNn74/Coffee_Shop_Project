import { Request, Response } from "express";
import { UserService } from "@/services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  
  create = async (req: Request, res: Response) => {
    try {
      const created = await this.userService.create(req.body);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    res.json(await this.userService.getAll())
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      res.json(await this.userService.getById(id));
    } catch (e: any) {
      res.status(404).json({ error: e.message });
    }
  };

  validate = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.validate(req.body);
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.login(req.body);
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.userService.delete(id);
      res.status(204).send();
    } catch (e: any) {
      res.status(404).json({ error: e.message });
    }
  };
  
};
