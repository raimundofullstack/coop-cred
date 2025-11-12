import dotenvFlow from "dotenv-flow";
import logger from "./config/logger.js";
dotenvFlow.config();

import app from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = process.env.PORT || 3009;

connectDb().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Servidor rodando na porta ${PORT}`);
    app.get("/", (req, res) => {
      res.redirect("/docs");
    });
  });
});
