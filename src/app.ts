import express from "express";
import { connection } from "./db/connect";
import log from "./logger";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  log.info(`App is running on port ${port}`);
  connection()
    .then(() => log.info("Database connected successfully"))
    .catch((error) => log.error(error.message));
});
