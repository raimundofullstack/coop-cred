import userService from "../../../services/userService.js";
import { createUser } from "../../factories/userFactory.js";

describe("UserService - Registro e Autenticação", () => {
  it("deve criar um novo usuário", async () => {
    const result = await userService.register({
      name: "Teste",
      email: "teste@teste.com",
      password: "123456",
    });

    expect(result.user).toHaveProperty("_id");
    expect(result.user.email).toBe("teste@teste.com");
    expect(result).toHaveProperty("token");
  });

  it("Não deve pertitir email duplicado", async () => {
    await userService.register({
      name: "Usuario 1",
      email: "usuario@gmail.com",
      password: 123456,
    });

    await expect(
      userService.register({
        nome: "Usuario 2",
        email: "usuario@gmail.com",
        password: 654321,
      })
    ).rejects.toThrow("Email já cadastrado");
  });

  it("deve validar login com senha incorreta", async () => {
    const result = await createUser();

    await expect(
      userService.login({
        email: result.user.email,
        password: "senha_incorreta",
      })
    ).rejects.toThrow("Senha inválida");
  });

  it("deve validar login com senha correta", async () => {
    const user = await createUser({ password: "senha_correta" });

    const result = await userService.login({
      email: user.user.email,
      password: "senha_correta",
    });
    expect(result).toHaveProperty("token");
  });

  it("deve validar login com usuário inexistente", async () => {
    await expect(
      userService.login({
        email: "emailinexistente@gmail.com",
        password: "123445",
      })
    ).rejects.toThrow("Usuário não encontrado");
  });
});
