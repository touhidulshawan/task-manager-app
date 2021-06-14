import { connect } from "mongoose";
import log from "../logger";

const url = "mongodb://127.0.0.1:27017/task-manager";

export const connection = async () => {
  try {
    await connect(url, {
      user: "touhidulshawan",
      pass: "shawan96",
      authSource: "admin",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
      .then(() => log.info("Database connected successfully"))
      .catch((error) => log.error(error.message));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
