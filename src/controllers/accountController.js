import accountService from "../services/accountService.js";

const accountController = {
  async create(req, res) {
    try {
      const userId = req.userId; // req.userId já definido pelo middleware
      const { accountType, creditLimit, goalDescription } = req.body;

      const account = await accountService.createAccount({
        userId,
        accountType,
        creditLimit,
        goalDescription,
      });
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const account = await accountService.getAccountById({ id });

      if (!account)
        return res.status(404).json({ error: "Conta não encontrada" });

      res.json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listByUser(req, res) {
    try {
      const userId = req.userId; // req.userId já definido pelo middleware
      const accounts = await accountService.getAccountsByUser({ userId });
      res.json(accounts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default accountController;
