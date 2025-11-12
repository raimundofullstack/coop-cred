import * as Sentry from "@sentry/node";
import AppError from "../errors/AppError.js";
import logger from "../config/logger.js";

export default function errorHandler(err, req, res, next) {
  // Se for AppError, erro esperado (por exemplo: validação, negócio)
  if (err instanceof AppError) {
    logger.warn(`[${err.errorCode}] ${err.message}`, {
      route: req.originalUrl,
      status: err.statusCode,
    });

    // Envia para o Sentry também — mas com nível "warning" (não crítico)
    Sentry.captureException(err, {
      level: "warning",
      tags: { type: "AppError", route: req.originalUrl },
      extra: { errorCode: err.errorCode, statusCode: err.statusCode },
    });

    return res.status(err.statusCode).json({
      code: err.errorCode,
      message: err.message,
    });
  }

  logger.error(`Erro inesperado: ${err.message}`, { stack: err.stack });
  // Para qualquer outro erro não previsto (exceção real)
  Sentry.captureException(err, {
    level: "error",
    tags: { type: "UnexpectedError", route: req.originalUrl },
  });

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
}
