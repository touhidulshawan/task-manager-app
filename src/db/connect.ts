import { connect } from "mongoose";
import config from "../config/default";

const url = config.mongo.url;
const options = config.mongo.options;

export const connection = async () => {
  try {
    await connect(url, options);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
