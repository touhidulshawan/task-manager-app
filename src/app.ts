import express from "express";
import { connection } from "./db/connect";
import log from "./logger";
import userRoutes from "./routes/userRoutes";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  log.info(`App is running on port ${port}`);
  connection()
    .then(() => {
      log.info("Database connected successfully");
      userRoutes(app);
    })
    .catch((error) => log.error(error.message));
});
