import Account from "../models/Account.js";

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
    return Account.findById(accountId).populate("userId", "name email role");
  },

  async getAccountsByUser({ userId }) {
    return Account.find({ userId }).sort({ type: 1 });
  },
};

export default accountService;
