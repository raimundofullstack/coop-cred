import reportService from "../services/reportService.js";
import logger from "../config/logger.js";

const reportController = {
  async totalsByType(req, res, next) {
    const { accountId } = req.params;
    logger.info(
      `Iniciando totais de movimentações por tipo da conta. Conta: ${accountId}`
    );
    try {
      const result = await reportService.getTotalsByType({ accountId });
      logger.info(`Listagem concluída. result: ${result}`);
      res.json(result);
    } catch (error) {
      logger.warn(`Erro na Listagem: ${error.message}`);
      next(error);
    }
  },
};

export default reportController;
