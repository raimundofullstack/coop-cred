import app from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = process.env.port || 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    app.get("/", (req, res) => {
      res.redirect("/docs");
    });
  });
});
