import accountService from "../../../services/accountService.js";
import { createUser } from "../../factories/userFactory.js";
import Account from "../../../models/Account.js";

describe("AccountService - Criação e Consultas", () => {
  it("deve criar uma nova conta para um usuário existente", async () => {
    const { user } = await createUser();

    // conta corrente criada automaticamente
    const corrente = await Account.findOne({
      userId: user._id,
      accountType: "CORRENTE",
    });
    expect(corrente).toMatchObject({
      userId: user._id,
      accountType: "CORRENTE",
    });

    const poupanca = await accountService.createAccount({
      userId: user._id,
      accountType: "POUPANCA",
      goalDescription: "Viagem",
    });

    const poupancaObj = poupanca.toObject();

    expect(poupancaObj).toMatchObject({
      userId: user._id,
      accountType: "POUPANCA",
      creditLimit: 0,
      goalDescription: "Viagem",
    });

    const poupancaDb = await Account.findOne({
      userId: user._id,
      accountType: "POUPANCA",
    });
    expect(poupancaDb).not.toBeNull();
    expect(poupancaDb.creditLimit).toBe(0);
  });

  it("deve retornar uma conta pelo ID e incluir dados do usuário", async () => {
    const { user } = await createUser();
    const account = await accountService.createAccount({
      userId: user._id,
      accountType: "POUPANCA",
      goalDescription: "Comprar carro",
    });

    const found = await accountService.getAccountById({
      accountId: account._id,
    });

    expect(found).toBeTruthy();
    expect(found.accountType).toBe("POUPANCA");
    expect(found.userId).toHaveProperty("name", user.name);
    expect(found.userId).toHaveProperty("email", user.email);
  });

  it("deve retornar todas as contas de um usuário", async () => {
    const { user } = await createUser();
    await accountService.createAccount({
      userId: user._id,
      accountType: "POUPANCA",
      goalDescription: "Comprar carro",
    });

    const accounts = await accountService.getAccountsByUser({
      userId: user._id,
    });

    expect(Array.isArray(accounts)).toBe(true);
    expect(accounts.length).toBeGreaterThanOrEqual(2);

    const tipos = accounts.map((a) => a.accountType);
    expect(tipos).toEqual(expect.arrayContaining(["CORRENTE", "POUPANCA"]));
  });
});
