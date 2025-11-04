import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
