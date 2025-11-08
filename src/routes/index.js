import { Router } from "express";
import userRoutes from "./userRoutes.js";
import accountRouter from "./accountRoutes.js";
import transactionRouter from "./transactionRoutes.js";
import reportRouter from "./reportRoutes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/accounts", accountRouter);
router.use("/transactions", transactionRouter);
router.use("/reports", reportRouter);

export default router;
