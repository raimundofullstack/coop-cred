import jwt from "jsonwebtoken";
import AppError from "../../../errors/AppError.js";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import { jest } from "@jest/globals";

describe("authMiddleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {};
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("deve lançar AppError se o token não for fornecido", () => {
    expect(() => authMiddleware(req, res, next)).toThrow(AppError);
    try {
      authMiddleware(req, res, next);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.errorCode).toBe("TOKEN_MISSING");
      expect(error.message).toBe("Token ausente");
      expect(error.statusCode).toBe(401);
    }
    expect(next).not.toHaveBeenCalled();
  });

  it("deve lançar AppError se o token for inválido", () => {
    req.headers.authorization = "Bearer token_invalido";
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("Token inválido");
    });

    expect(() => authMiddleware(req, res, next)).toThrow(AppError);
    try {
      authMiddleware(req, res, next);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.errorCode).toBe("INVALID_TOKEN");
      expect(error.message).toBe("Token inválido");
      expect(error.statusCode).toBe(401);
    }
    expect(next).not.toHaveBeenCalled();
  });
});
