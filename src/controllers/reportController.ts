import { Request, Response } from "express";
import { reportService } from "../services/reportService.js";

export const reportController = {
  async totalsByType(req: Request, res: Response) {
    try {
      const { accountId } = req.params;
      const result = await reportService.getTotalsByType(accountId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
