import { Request, Response } from "express";
import { accountService } from "../services/accountService.js";

export const accountController = {
  async create(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { accountType, creditLimit, goalDescription } = req.body;

      const account = await accountService.createAccount(
        userId,
        accountType,
        creditLimit,
        goalDescription
      );
      res.status(201).json(account);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const account = await accountService.getAccountById(id);

      if (!account)
        return res.status(404).json({ error: "Conta não encontrada" });

      res.json(account);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async listByUser(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const accounts = await accountService.getAccountsByUser(userId);
      res.json(accounts);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
