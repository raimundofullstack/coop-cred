import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const data = await userService.register(name, email, password, role);
      res.status(201).json(data);
    } catch (error: any) {
      res.status(400).json({ message: (error as Error).message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await userService.login(email, password);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ message: (error as Error).message });
    }
  },
};
