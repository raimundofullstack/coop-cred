import accountService from "../services/accountService.js";
import logger from "../config/logger.js";

const accountController = {
  async create(req, res, next) {
    const userId = req.userId; // req.userId já definido pelo middleware
    const { accountType, creditLimit, goalDescription } = req.body;
    logger.info(
      `Iniciando criação de uma conta. UserId: ${userId}, AccountType: ${accountType}, CreditLimit: ${creditLimit}, GoalDescription: ${goalDescription}`
    );
    try {
      const account = await accountService.createAccount({
        userId,
        accountType,
        creditLimit,
        goalDescription,
      });
      logger.info(`Conta Criada com sucesso: Account: ${account._id}`);
      res.status(201).json(account);
    } catch (error) {
      logger.warn(`Erro na criação da conta: ${error.message}`);
      next(error);
    }
  },

  async getById(req, res, next) {
    const { id } = req.params;
    logger.info(`Iniciando a busca de uma conta. Id: ${id}`);
    try {
      const account = await accountService.getAccountById({ accountId: id });
      logger.info(`Conta localizada com sucesso: Account: ${account._id}`);

      res.json(account);
    } catch (error) {
      logger.warn(`Erro na Listagem: ${error.message}`);
      next(error);
    }
  },

  async listByUser(req, res, next) {
    const userId = req.userId; // req.userId já definido pelo middleware
    logger.info(`Iniciando a busca de contas por usuarios. UserId: ${userId}`);
    try {
      const accounts = await accountService.getAccountsByUser({ userId });
      logger.info(
        `Contas localizadas com sucesso: Accounts: ${accounts.length}`
      );
      res.json(accounts);
    } catch (error) {
      logger.warn(`Erro na Listagem: ${error.message}`);
      next(error);
    }
  },
};

export default accountController;
