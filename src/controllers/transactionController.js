import transactionService from "../services/transactionService.js";

const transactionController = {
  async deposit(req, res) {
    try {
      const { accountId, amount } = req.body;
      const tx = await transactionService.deposit({ accountId, amount });
      res.status(201).json(tx);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async withdraw(req, res) {
    try {
      const { accountId, amount } = req.body;
      const tx = await transactionService.withdraw({ accountId, amount });
      res.status(201).json(tx);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async transfer(req, res) {
    try {
      const { fromAccountId, toAccountId, amount } = req.body;
      const tx = await transactionService.transfer({
        fromAccountId,
        toAccountId,
        amount,
      });
      res.status(201).json(tx);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listByAccount(req, res) {
    try {
      const { accountId } = req.params;
      const txs = await transactionService.listByAccount({ accountId });
      res.json(txs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default transactionController;
