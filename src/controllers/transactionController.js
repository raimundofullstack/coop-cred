import transactionService from "../services/transactionService.js";
import logger from "../config/logger.js";

const transactionController = {
  async deposit(req, res, next) {
    const { accountId, amount } = req.body;
    logger.info(`Iniciando deposito. Conta: ${accountId}, Valor: ${amount}`);
    try {
      const tx = await transactionService.deposit({ accountId, amount });
      logger.info(`Saque deposito. TX: ${tx.id}`);
      res.status(201).json(tx);
    } catch (error) {
      logger.warn(`Erro no deposito: ${error.message}`);
      next(error);
    }
  },

  async withdraw(req, res, next) {
    const { accountId, amount } = req.body;
    logger.info(`Iniciando saque. Conta: ${accountId}, Valor: ${amount}`);
    try {
      const tx = await transactionService.withdraw({ accountId, amount });
      logger.info(`Saque concluído. TX: ${tx.id}`);
      res.status(201).json(tx);
    } catch (error) {
      logger.warn(`Erro no saque: ${error.message}`);
      next(error);
    }
  },

  async transfer(req, res, next) {
    const { fromAccountId, toAccountId, amount } = req.body;
    logger.info(
      `Iniciando transferencia. Conta Origem: ${fromAccountId},  Conta Destino: ${toAccountId}, Valor: ${amount}`
    );
    try {
      const tx = await transactionService.transfer({
        fromAccountId,
        toAccountId,
        amount,
      });
      logger.info(`Transferência concluída. TX: ${tx.id}`);
      res.status(201).json(tx);
    } catch (error) {
      logger.warn(`Erro na transferencia: ${error.message}`);
      next(error);
    }
  },

  async listByAccount(req, res, next) {
    const { accountId } = req.params;
    logger.info(`Iniciando lista por conta. Conta: ${accountId}`);
    try {
      const txs = await transactionService.listByAccount({ accountId });
      logger.info(`Listagem concluída. TXS: ${txs.length}`);
      res.json(txs);
    } catch (error) {
      logger.warn(`Erro na Listagem: ${error.message}`);
      next(error);
    }
  },
};

export default transactionController;
