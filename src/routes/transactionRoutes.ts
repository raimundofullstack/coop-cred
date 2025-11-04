import { Router } from "express";
import { transactionController } from "../controllers/transactionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.post(
  "/deposit",
  /* 
 #swagger.tags = ['Transactions']
 #swagger.path = '/transactions/deposit'
 #swagger.description = 'Depósito na conta'
*/
  transactionController.deposit
);
transactionRouter.post(
  "/withdraw",
  /* 
 #swagger.tags = ['Transactions']
 #swagger.path = '/transactions/withdraw'
 #swagger.description = 'Saque da conta'
*/ transactionController.withdraw
);
transactionRouter.post(
  "/transfer",
  /* 
 #swagger.tags = ['Transactions']
 #swagger.path = '/transactions/transfer'
 #swagger.description = 'Transferências entre contas'
*/ transactionController.transfer
);
transactionRouter.get(
  "/account/:accountId",
  /* 
 #swagger.tags = ['Transactions']
 #swagger.path = '/transactions/account/{accountId}'
 #swagger.description = 'Detalhes sobre depósitos, saques e transferências entre contas'
*/
  transactionController.listByAccount
);
