import { Router } from "express";
import accountController from "../controllers/accountController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const accountRouter = Router();

accountRouter.use(authMiddleware);

accountRouter.post(
  "/",
  /* 
   #swagger.tags = ['Accounts']
   #swagger.path = '/accounts/'
   #swagger.description = 'Cria uma nova conta bancária'
  */
  accountController.create
);

accountRouter.get(
  "/",
  /* 
   #swagger.tags = ['Accounts']
   #swagger.path = '/accounts/'
   #swagger.description = 'Listar todas as contas bancárias'
  */
  accountController.listByUser
);

accountRouter.get(
  "/:id",
  /* 
   #swagger.tags = ['Accounts']
   #swagger.path = '/accounts/{id}'
   #swagger.description = 'Listar uma conta bancária específica'
  */
  accountController.getById
);

export default accountRouter;
