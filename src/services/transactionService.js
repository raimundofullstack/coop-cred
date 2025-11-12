import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import AppError from "../errors/AppError.js";

const transactionService = {
  async deposit({ accountId, amount }) {
    if (amount <= 0)
      throw new AppError("DEPOSIT_VALUE_INVALID", "Valor inválido", 400);

    const account = await Account.findById(accountId);
    if (!account)
      throw new AppError("ACCOUNT_NOT_FOUND", "Conta não encontrada");

    account.balance += amount;
    await account.save();

    const tx = new Transaction({
      toAccount: account._id,
      type: "DEPOSITO",
      amount,
    });
    await tx.save();

    return tx;
  },

  async withdraw({ accountId, amount }) {
    if (amount <= 0)
      throw new AppError("WITHDRAW_VALUE_INVALID", "Valor inválido");

    const account = await Account.findById(accountId);
    if (!account)
      throw new AppError("ACCOUNT_NOT_FOUND", "Conta não encontrada");

    const totalDisponivel = account.balance + account.creditLimit;
    if (amount > totalDisponivel)
      throw new AppError("BALANCE_INSUFFICIENT", "Saldo insuficiente");

    account.balance -= amount;
    await account.save();

    const tx = new Transaction({
      fromAccount: account._id,
      type: "SAQUE",
      amount,
    });
    await tx.save();

    return tx;
  },

  async transfer({ fromAccountId, toAccountId, amount }) {
    if (fromAccountId === toAccountId)
      throw new AppError(
        "NOT_TRANSFER_SAME_ACCOUNT",
        "Não é possível transferir para a mesma conta"
      );
    if (amount <= 0)
      throw new AppError("TRANSFER_VALUE_INVALID", "Valor inválido");

    const [from, to] = await Promise.all([
      Account.findById(fromAccountId),
      Account.findById(toAccountId),
    ]);

    if (!from || !to)
      throw new AppError(
        "ACCOUNT_FROM_OR_TO_NOT_FOUND",
        "Conta origem ou destino não encontrada"
      );

    const totalDisponivel = from.balance + from.creditLimit;
    if (amount > totalDisponivel)
      throw new AppError("BALANCE_INSUFFICIENT", "Saldo insuficiente");

    // atualiza saldos sem sessão
    from.balance -= amount;
    to.balance += amount;

    await Promise.all([from.save(), to.save()]);

    const tx = new Transaction({
      fromAccount: from._id,
      toAccount: to._id,
      type: "TRANSFERENCIA",
      amount,
    });

    await tx.save();
    return tx;
  },

  async listByAccount({ accountId }) {
    return Transaction.find({
      $or: [{ fromAccount: accountId }, { toAccount: accountId }],
    })
      .populate("fromAccount", "accountType")
      .populate("toAccount", "accountType")
      .sort({ createdAt: -1 });
  },
};

export default transactionService;
