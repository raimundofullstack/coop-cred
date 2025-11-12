import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import dotenvFlow from "dotenv-flow";
import swaggerUi from "swagger-ui-express";
import router from "./routes/index.js";
import * as Sentry from "@sentry/node"; // Mantém a importação
import { expressErrorHandler } from "@sentry/node";
import errorHandler from "./middlewares/errorHandler.js";
//import morgan from "morgan";
import requestLogger from "./middlewares/requestLogger.js";
import logger from "./config/logger.js";

dotenvFlow.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  integrations: [Sentry.expressIntegration()],
});

const app = express();

app.use(requestLogger);

app.use(cors());
app.use(express.json());
app.use("/api", router);

// Lendo JSON direto do arquivo
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("./src/swagger-output.json"), "utf-8")
);

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);
app.use(expressErrorHandler());

// 3. Seu handler de erro de fallthrough
app.use(function onError(err, req, res, next) {
  // A ID do erro é anexada a res.sentry
  console.error(err);
  res.statusCode = 500;
  // O erro pode não ter .sentry se expressErrorHandler() não for executado,
  // mas o Sentry deve ter capturado o evento de qualquer forma.
  res.end((res.sentry || "Server Error") + "\n");
});
export default app;
