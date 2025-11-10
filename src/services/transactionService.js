import mongoose from "mongoose";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

const transactionService = {
  async deposit({ accountId, amount }) {
    if (amount <= 0) throw new Error("Valor inválido");

    const account = await Account.findById(accountId);
    if (!account) throw new Error("Conta não encontrada");

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
    if (amount <= 0) throw new Error("Valor inválido");

    const account = await Account.findById(accountId);
    if (!account) throw new Error("Conta não encontrada");

    const totalDisponivel = account.balance + account.creditLimit;
    if (amount > totalDisponivel) throw new Error("Saldo insuficiente");

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

  async transfer({ fromId, toId, amount }) {
    if (fromId === toId)
      throw new Error("Não é possível transferir para a mesma conta");
    if (amount <= 0) throw new Error("Valor inválido");

    const [from, to] = await Promise.all([
      Account.findById(fromId),
      Account.findById(toId),
    ]);

    if (!from || !to) throw new Error("Conta origem ou destino não encontrada");

    const totalDisponivel = from.balance + from.creditLimit;
    if (amount > totalDisponivel) throw new Error("Saldo insuficiente");

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
