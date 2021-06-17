import { connect } from "mongoose";

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
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
