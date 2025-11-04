import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { accountRouter } from "./accountRoutes";
import { transactionRouter } from "./transactionRoutes";
import { reportRouter } from "./reportRoutes";

export const router = Router();

router.use("/users", userRoutes);
router.use("/accounts", accountRouter);
router.use("/transactions", transactionRouter);
router.use("/reports", reportRouter);
