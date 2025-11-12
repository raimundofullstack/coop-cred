import morgan from "morgan";
import logger from "../config/logger.js";

// define um stream para o morgan usar o winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

const skip = () => process.env.NODE_ENV === "development";

const requestLogger = morgan("combined", { stream, skip });

export default requestLogger;
