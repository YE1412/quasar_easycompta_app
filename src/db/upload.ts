import multer from "multer";
import path from "path";
import util from "util";
// import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";
// import { Capacitor } from '@capacitor/core';
// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
const MAX_SIZE = 2;
const __dirname = path.resolve(path.dirname('src/db/upload'), '../../');
dotenv.config({ path: path.join(__dirname, "/envs/.env") });
const maxSize = MAX_SIZE * 1024 * 1024;

let dest = null, uploadFile = null;
dest = "/src/assets/uploads/";
//   process.env.CTX === "production" ? "/dist/prod/client/assets/uploads/" : dest;
// dest = process.env.CTX === "development" ? "/src/assets/uploads/" : dest;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, dest));
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, file.originalname);
  },
});

uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

export { uploadFileMiddleware as upload, MAX_SIZE };
