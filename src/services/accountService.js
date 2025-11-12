import Account from "../models/Account.js";
import AppError from "../errors/AppError.js";

const accountService = {
  async createAccount({ userId, accountType, creditLimit, goalDescription }) {
    const account = new Account({
      userId,
      accountType,
      creditLimit,
      goalDescription,
    });

    await account.save();
    return account;
  },

  async getAccountById({ accountId }) {
    const result = await Account.findById(accountId).populate(
      "userId",
      "name email role"
    );

    if (!result)
      throw new AppError("ACCOUNT_NOT_FOUND", "Conta não encontrada");

    return result;
  },

  async getAccountsByUser({ userId }) {
    return Account.find({ userId }).sort({ type: 1 });
  },
};

export default accountService;
