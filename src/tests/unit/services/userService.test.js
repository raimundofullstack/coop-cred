import userService from "../../../services/userService.js";
import User from "../../../models/User.js";
import bcrypt from "bcrypt";

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

  //   it("não deve permitir email duplicado", async () => {
  //     await userService.register({
  //       name: "A",
  //       email: "a@a.com",
  //       password: "123456",
  //     });

  //     await expect(
  //       userService.register({
  //         name: "B",
  //         email: "a@a.com",
  //         password: "654321",
  //       })
  //     ).rejects.toThrow("Email já cadastrado");
  //   });

  //   it("deve validar login com senha correta", async () => {
  //     const password = await bcrypt.hash("123456", 10);
  //     await User.create({ name: "A", email: "a@a.com", password });

  //     const token = await userService.login("a@a.com", "123456");
  //     expect(token).toBeDefined();
  //   });
});
