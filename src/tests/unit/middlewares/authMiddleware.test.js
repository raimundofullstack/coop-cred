import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";
import authMiddleware from "../../../middlewares/authMiddleware.js";

describe("authMiddleware", () => {
  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("deve retornar 401 se o token não for fornecido", () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token ausente" });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 401 se o token for inválido", () => {
    req.headers.authorization = "Bearer token_invalido";
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Token inválido");
    });

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(
      "token_invalido",
      process.env.JWT_SECRET
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
    expect(next).not.toHaveBeenCalled();
  });
});
