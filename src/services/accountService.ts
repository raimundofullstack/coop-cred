import { Account, IAccount } from "../models/Account";

export const accountService = {
  async createAccount(
    userId: string,
    accountType: "CORRENTE" | "POUPANCA" = "CORRENTE",
    creditLimit = 0,
    goalDescription?: string
  ): Promise<IAccount> {
    const account = new Account({
      userId,
      accountType,
      creditLimit,
      goalDescription,
    });

    await account.save();
    return account;
  },

  async getAccountById(accountId: string): Promise<IAccount | null> {
    return Account.findById(accountId).populate("userId", "name email role");
  },

  async getAccountsByUser(userId: string): Promise<IAccount[]> {
    return Account.find({ userId }).sort({ type: 1 });
  },
};
