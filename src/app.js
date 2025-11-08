import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

// Lendo JSON direto do arquivo
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("./src/swagger-output.json"), "utf-8")
);

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
