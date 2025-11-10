import { jest } from "@jest/globals";

// 🔹 Mock do userService antes das importações
jest.unstable_mockModule("../../../services/userService.js", () => ({
  default: {
    register: jest.fn(),
    login: jest.fn(),
  },
}));

// 🔹 Importa o mock e o controller (depois do mock)
const { default: userService } = await import(
  "../../../services/userService.js"
);
const { default: userController } = await import(
  "../../../controllers/userController.js"
);

describe("UserController", () => {
  describe("register", () => {
    it("deve registrar um usuário e retornar status 201", async () => {
      const req = {
        body: { name: "Teste", email: "teste@teste.com", password: "123456" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      userService.register.mockResolvedValue({
        user: { id: "1", email: "teste@teste.com" },
        token: "fake-token",
      });

      await userController.register(req, res);

      expect(userService.register).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        user: { id: "1", email: "teste@teste.com" },
        token: "fake-token",
      });
    });
  });

  describe("login", () => {
    it("deve autenticar um usuário e retornar status 200", async () => {
      const req = {
        body: { email: "teste@teste.com", password: "123456" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      userService.login.mockResolvedValue({
        user: { id: "1", email: "teste@teste.com" },
        token: "fake-token",
      });

      await userController.login(req, res);

      expect(userService.login).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: { id: "1", email: "teste@teste.com" },
        token: "fake-token",
      });
    });
  });
});
