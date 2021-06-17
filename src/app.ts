import express from "express";
import config from "./config/default";
import { connection } from "./db/connect";
import log from "./logger";
import userRoutes from "./routes/userRoutes";

const NAMESAPCE = "SERVER";
const hostname = config.server.hostname;
const port = config.server.port;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  log.info(`${NAMESAPCE}-> App is running on ${hostname}:${port}`);
  connection()
    .then(() => {
      log.info("Database connected successfully");
      userRoutes(app);
    })
    .catch((error) => log.error(error.message));
});
