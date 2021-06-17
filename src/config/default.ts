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

const expireTokenTime = "15m";
const refreshTokenTime = "1y";
const privateKey =
  "-----BEGIN RSA PRIVATE KEY-----\n" +
  "MIICWwIBAAKBgQDPNQFt0QLKmD+bHtHvp6roZc8V/rBZv50s72W/UbnlXOR1uB66\n" +
  "qs+WPie4JCztJw2RLLyQcQiHJa7nGyL/R3Liw8ZGbTtIrOFiI7DvGrDcdEaIZRbU\n" +
  "kQoS3G7NxiRydqA1SfO/Q9acWgGzWBchErsPrQbuHg9GiFbSVKUc6W0sPwIDAQAB\n" +
  "AoGAW5TL6uOkXjLoegEnPMtYiJrm6ovFGgXMzF2LFQJkLXHfMACO5GY2lesm1wZ2\n" +
  "LOND5dRmC1lKMaGAKnkeAMJtjew1q9sve6Kb0VGcMRvEgJe5uVw67btsv7fwVekG\n" +
  "vyurIuHKdGhei72gHMDwGiGGBW/IPGZ4t7s6fL8HJG+t4PECQQD6hZ7P4He5wdbW\n" +
  "x0WUivhyS1ysoGfKxFy1npsvPiRpJjq2bq2xb5KWyVdRgQBzn/oYIZGQN09dfcSq\n" +
  "DHopBDzVAkEA07zqbAb0Woy6kiLIywRJHKIyypPtIjxZ0wdvpctrCZXHM6/cN//h\n" +
  "cT2bGgo/pWEgGbuypaks9KJLLsuVGTp+wwJAQrk5/iXL3Ya6IMQ8TP7igxZ9XWDv\n" +
  "o/q+soTG0kNb0UGkW5iI3HxZ7506i3OvWhxesPSn32BL3Bu2OJBQLQJ67QJAGVK4\n" +
  "vp6+Tq4SCjQ6y30BuXj0liHG9Jc/LuvuwGdpr8XIAzh/H/tsXPy/NggPwJmzGyDF\n" +
  "puZqx/84+qnCdTf3vQJAPHqSnw1wlmZi0is1B3xk9kVo2MuLF1ZNyEkW3S3lcOD3\n" +
  "UFDoSWyAuIep6yx8Yon0eYkRfeHICKdCEKlBg4Kjqw==\n" +
  "-----END RSA PRIVATE KEY-----";

const tokenConfig = {
  expireTokenTime,
  privateKey,
  refreshTokenTime,
};

const config = {
  mongo: MONGO,
  server: SERVER,
  tokenConfig,
};
export default config;
