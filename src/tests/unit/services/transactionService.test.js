import transactionService from "../../../services/transactionService.js";
import { createUser } from "../../factories/userFactory.js";
import Account from "../../../models/Account.js";

describe("TransactionService - Operações Financeiras", () => {
  it("deve realizar um depósito com sucesso", async () => {
    const { user } = await createUser();
    const conta = await Account.findOne({ userId: user._id });

    const tx = await transactionService.deposit({
      accountId: conta._id,
      amount: 1000,
    });
    const contaAtualizada = await Account.findById(conta._id);

    expect(tx).toHaveProperty("_id");
    expect(tx.type).toBe("DEPOSITO");
    expect(tx.amount).toBe(1000);
    expect(tx.toAccount.toString()).toBe(conta._id.toString());

    expect(contaAtualizada.balance).toBe(1000);
  });

  it("não deve permitir depósito com valor inválido", async () => {
    const { user } = await createUser();
    const conta = await Account.findOne({ userId: user._id });

    await expect(
      transactionService.deposit({ accountId: conta._id, amount: 0 })
    ).rejects.toThrow("Valor inválido");
    await expect(
      transactionService.deposit({ accountId: conta._id, amount: -50 })
    ).rejects.toThrow("Valor inválido");
  });

  it("deve realizar um saque com sucesso", async () => {
    const { user } = await createUser();
    const conta = await Account.findOne({ userId: user._id });

    // adiciona saldo manualmente
    conta.balance = 2000;
    await conta.save();

    const tx = await transactionService.withdraw({
      accountId: conta._id,
      amount: 500,
    });
    const contaAtualizada = await Account.findById(conta._id);

    expect(tx.type).toBe("SAQUE");
    expect(tx.amount).toBe(500);
    expect(tx.fromAccount.toString()).toBe(conta._id.toString());
    expect(contaAtualizada.balance).toBe(1500);
  });

  it("não deve permitir saque acima do saldo + limite", async () => {
    const { user } = await createUser();
    const conta = await Account.findOne({ userId: user._id });
    conta.balance = 100;
    conta.creditLimit = 200;
    await conta.save();

    await expect(
      transactionService.withdraw({ accountId: conta._id, amount: 400 })
    ).rejects.toThrow("Saldo insuficiente");
  });

  it("deve realizar uma transferência entre contas", async () => {
    const { user: user1 } = await createUser();
    const { user: user2 } = await createUser();

    const contaOrigem = await Account.findOne({ userId: user1._id });
    const contaDestino = await Account.findOne({ userId: user2._id });

    contaOrigem.balance = 3000;
    await contaOrigem.save();

    const tx = await transactionService.transfer({
      fromId: contaOrigem._id,
      toId: contaDestino._id,
      amount: 1000,
    });

    const origemAtualizada = await Account.findById(contaOrigem._id);
    const destinoAtualizada = await Account.findById(contaDestino._id);

    expect(tx.type).toBe("TRANSFERENCIA");
    expect(tx.amount).toBe(1000);
    expect(tx.fromAccount.toString()).toBe(contaOrigem._id.toString());
    expect(tx.toAccount.toString()).toBe(contaDestino._id.toString());
    expect(origemAtualizada.balance).toBe(2000);
    expect(destinoAtualizada.balance).toBe(1000);
  });

  it("não deve permitir transferência para a mesma conta", async () => {
    const { user } = await createUser();
    const conta = await Account.findOne({ userId: user._id });

    await expect(
      transactionService.transfer({
        fromId: conta._id,
        toId: conta._id,
        amount: 100,
      })
    ).rejects.toThrow("Não é possível transferir para a mesma conta");
  });

  it("deve listar transações de uma conta", async () => {
    const { user: user1 } = await createUser();
    const { user: user2 } = await createUser();

    const conta1 = await Account.findOne({ userId: user1._id });
    const conta2 = await Account.findOne({ userId: user2._id });

    // cria 2 transferências
    await transactionService.transfer({
      fromId: conta1._id,
      toId: conta2._id,
      amount: 200,
    });
    await transactionService.transfer({
      fromId: conta2._id,
      toId: conta1._id,
      amount: 150,
    });

    const transacoes = await transactionService.listByAccount({
      accountId: conta1._id,
    });

    expect(transacoes.length).toBeGreaterThanOrEqual(2);
    expect(transacoes[0]).toHaveProperty("type");
    expect(transacoes[0]).toHaveProperty("amount");
  });
});
