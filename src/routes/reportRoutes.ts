import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { reportController } from "../controllers/reportController.js";

export const reportRouter = Router();

reportRouter.use(authMiddleware);

reportRouter.get(
  "/totals/:accountId",
  /* 
 #swagger.tags = ['Reports']
 #swagger.path = '/reports/totals/{accountId}'
 #swagger.description = 'Relatórios financeiros e agregações'
*/
  reportController.totalsByType
);
