import express from "express";
import { connection } from "./db/connect";
import log from "./logger";
import userRoutes from "./routes/userRoutes";
import config from "./config/config";

const NAMESPACES = "SERVER";

const port = config.server.port;
const hostname = config.server.hostname;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  log.info(`${NAMESPACES}: App is running on port ${hostname}:${port}`);
  connection()
    .then(() => {
      log.info("Database connected successfully");
      userRoutes(app);
    })
    .catch((error) => log.error(error.message));
});
