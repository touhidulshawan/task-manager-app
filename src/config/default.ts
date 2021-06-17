const MONGO_OPTIONS = {
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  keepAlive: true,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "touhidulshawan";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "shawan96";
const MONGO_HOST = process.env.MONGO_URL || "task-manager";

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb://127.0.0.1:27017/${MONGO_HOST}`,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mongo: MONGO,
  server: SERVER,
};
export default config;
