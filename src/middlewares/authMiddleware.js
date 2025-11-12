import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("TOKEN_MISSING", "Token ausente", 401);

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    throw new AppError("INVALID_TOKEN", "Token inválido", 401);
  }
}
