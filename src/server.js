import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

import app from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = process.env.PORT || 3009;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    app.get("/", (req, res) => {
      res.redirect("/docs");
    });
  });
});
