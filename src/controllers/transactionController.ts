import { Request, Response } from "express";
import { transactionService } from "../services/transactionService.js";

export const transactionController = {
  async deposit(req: Request, res: Response) {
    try {
      const { accountId, amount } = req.body;
      const tx = await transactionService.deposit(accountId, amount);
      res.status(201).json(tx);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async withdraw(req: Request, res: Response) {
    try {
      const { accountId, amount } = req.body;
      const tx = await transactionService.withdraw(accountId, amount);
      res.status(201).json(tx);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async transfer(req: Request, res: Response) {
    try {
      const { fromAccountId, toAccountId, amount } = req.body;
      const tx = await transactionService.transfer(
        fromAccountId,
        toAccountId,
        amount
      );
      res.status(201).json(tx);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async listByAccount(req: Request, res: Response) {
    try {
      const { accountId } = req.params;
      const txs = await transactionService.listByAccount(accountId);
      res.json(txs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
