import * as dotenv from "dotenv";
import path from "path";
// import { fileURLToPath } from "node:url";

const __dirname = path.resolve(path.dirname('src/db/config/db.config'), '../../../');
const destPath = path.join(__dirname, "/envs/.env");
dotenv.config({ path: destPath });

// console.log(__dirname);
// console.log(destPath);
// console.log(process.env);

const config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  PORT: process.env.DB_PORT,
  PROD: process.env.PROD,
  pool: {
    // maximum number of connection in pool
    max: 5,
    // minimum number of connection in pool
    min: 0,
    // maximum time, in milliseconds, that pool
    // will try to get connection before
    // throwing error
    acquire: 3000,
    // maximum time, in milliseconds, that
    // a connection can be idle before being
    // released
    idle: 10000,
  },
};

export default config;
